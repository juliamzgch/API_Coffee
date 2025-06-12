import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Injectable()
export class CoffeeService {
  constructor(private prisma: PrismaService) {}

  async create(createCafeDto: CreateCoffeeDto) {
    const { nome, tipo, preco, descricao, tags } = createCafeDto;

    // Criar ou conectar tags existentes
    const connectOrCreateTags = tags.map(tag => ({
      where: { nome: tag },
      create: { nome: tag },
    }));

    try {
      const cafe = await this.prisma.cafe.create({
        data: {
          nome,
          tipo,
          preco,
          descricao,
          tags: {
            connectOrCreate: connectOrCreateTags,
          },
        },
        include: { tags: true },
      });

      return {
        id: cafe.id,
        nome: cafe.nome,
        tags: cafe.tags.map(t => t.nome),
      };
    } catch (error) {
      throw new BadRequestException('Erro ao criar café');
    }
  }

  async findAll() {
    const cafes = await this.prisma.cafe.findMany({
      include: { tags: true },
    });

    return cafes.map(cafe => ({
      id: cafe.id,
      nome: cafe.nome,
      tags: cafe.tags.map(t => t.nome),
    }));
  }

  async findPedidosByCafeId(id: number) {
    const cafe = await this.prisma.cafe.findUnique({
      where: { id },
      include: {
        itensPedido: {
          include: {
            pedido: true,
          },
        },
      },
    });

    if (!cafe) throw new NotFoundException('Café não encontrado');

    // Mapear pedidos com quantidade comprada
    const pedidos = cafe.itensPedido.map(item => ({
      pedidoId: item.pedido.id,
      quantidade: item.quantidade,
      dataPedido: item.pedido.dataPedido,
      totalPedido: item.pedido.totalPedido,
      clienteId: item.pedido.clienteId,
    }));

    return {
      id: cafe.id,
      nome: cafe.nome,
      pedidos,
    };
  }

  async findMaisVendidos(tipo?: string, nome?: string) {
    // Filtro dinâmico
    const filtro: any = {};
    if (tipo) filtro.tipo = { contains: tipo, mode: 'insensitive' };
    if (nome) filtro.nome = { contains: nome, mode: 'insensitive' };

    // Agregação da soma da quantidade de itens pedidos por café
    const vendas = await this.prisma.itemPedido.groupBy({
      by: ['cafeId'],
      _sum: { quantidade: true },
      orderBy: { _sum: { quantidade: 'desc' } },
      take: 3,
      where: {
        cafe: filtro,
      },
    });

    // Buscar os dados completos dos cafés do top 3
    const cafes = await this.prisma.cafe.findMany({
      where: {
        id: { in: vendas.map(v => v.cafeId) },
      },
      include: { tags: true },
    });

    return cafes.map(cafe => {
      const venda = vendas.find(v => v.cafeId === cafe.id);
      return {
        id: cafe.id,
        nome: cafe.nome,
        tipo: cafe.tipo,
        totalVendido: venda?._sum.quantidade ?? 0,
        tags: cafe.tags.map(t => t.nome),
      };
    });
  }

  async remove(id: number) {
    const cafe = await this.prisma.cafe.findUnique({
      where: { id },
      include: { tags: true },
    });
    if (!cafe) throw new NotFoundException('Café não encontrado');

    // Deletar o café (tags associadas não são deletadas no banco automaticamente)
    // Se quiser deletar tags que não estão mais associadas a nenhum café, terá que fazer lógica extra.
    await this.prisma.cafe.delete({
      where: { id },
    });

    return { message: 'Café deletado com sucesso' };
  }
}
