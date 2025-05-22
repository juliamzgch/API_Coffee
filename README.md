## ☕ Coffee API - NestJS

API desenvolvida com [NestJS](https://nestjs.com/) para gerenciar um catálogo de cafés. Permite listar, criar e consultar detalhes de cafés armazenados em memória (mock data).

---

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) – Framework Node.js
- [TypeScript](https://www.typescriptlang.org/)
- [class-validator](https://github.com/typestack/class-validator) – Validação de DTOs
- [class-transformer](https://github.com/typestack/class-transformer)

---

## 📁 Estrutura de Pastas

src/
├── app.controller.ts # Controlador principal
├── app.service.ts # Lógica de negócio
├── app.module.ts # Módulo raiz
├── dto/
│ └── create-coffee.dto.ts # DTO com validações


## 🔧 Instalação

```bash
# Clonar o repositório
  git clone https://github.com/seu-usuario/coffee-api-nest.git

# Entrar na pasta
  cd coffee-api-nest

# Instalar as dependências
  npm install
▶️ Executar o projeto
  npm run start:dev

O servidor estará disponível em: http://localhost:3000

📦 Endpoints
✅ GET /coffees
Lista todos os cafés cadastrados.

✅ POST /coffee-create
Cria um novo café.

📤 Corpo da requisição (JSON):
{
  "nome": "Encanto",
  "tipo": "Suave",
  "quantidade": 2,
  "preco": 22.0,
  "id": "30",
  "descricao": "Bebida delicada com notas florais e toque de frutas vermelhas.",
  "tags": ["floral", "frutas vermelhas", "suave"]
}
📥 Resposta esperada (201):
{
  "message": "Café criado com sucesso",
  "cafe": {
    "nome": "Encanto",
    "tipo": "Suave",
    "quantidade": 2,
    "preco": 22.0,
    "id": "30",
    "descricao": "Bebida delicada com notas florais e toque de frutas vermelhas.",
    "tags": ["floral", "frutas vermelhas", "suave"]
  }
}
⚠️ Os campos nome, tipo e id são obrigatórios. Caso estejam ausentes, será retornado erro 400.

✅ GET /coffees/:id/detalhes
  Retorna os detalhes de um café pelo id.

📘 Validação com class-validator
  Utilizamos o class-validator para garantir que os campos obrigatórios estejam presentes e válidos:
  
  @IsString(), @IsNotEmpty() para nome, tipo e id
  
  @IsNumber() e @IsOptional() para quantidade e preco
  
  @IsArray() para tags

📝 Licença
Projeto desenvolvido para fins educacionais com NestJS ❤️
