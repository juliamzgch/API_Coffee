import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Apaga dados existentes para evitar duplicação
  await prisma.itemPedido.deleteMany();
  await prisma.pedido.deleteMany();
  await prisma.entrega.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.cafe.deleteMany();
  await prisma.tag.deleteMany();

  // Criar cafés com tags associadas
  const cafe1 = await prisma.cafe.create({
    data: {
      nome: 'Paraíso',
      tipo: 'Forte',
      preco: 25.6,
      descricao: 'Café encorpado com notas intensas de cacau e aroma marcante.',
      tags: {
        create: [
          { nome: 'intenso' },
          { nome: 'cacau' },
          { nome: 'tradicional' },
        ],
      },
    },
  });

  const cafe2 = await prisma.cafe.create({
    data: {
      nome: 'Doce Aroma',
      tipo: 'Suave',
      preco: 18.0,
      descricao: 'Café com aroma doce e sabor delicado.',
      tags: {
        create: [
          { nome: 'suave' },
          { nome: 'aroma' },
        ],
      },
    },
  });

  console.log('Seed concluído:', { cafe1, cafe2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
