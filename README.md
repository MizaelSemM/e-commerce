# 🚀 WhatsApp Storefront

> Uma plataforma **Full-Stack** desenvolvida com **Next.js**, **Prisma** e **PostgreSQL** que transforma um catálogo de produtos em uma vitrine inteligente integrada ao WhatsApp.

<p align="center">

**Next.js • TypeScript • Prisma • PostgreSQL • JWT • Tailwind CSS**

</p>

---

# 📸 Preview

> **Adicione aqui screenshots do projeto**

* 🏠 Home
* 🛍️ Catálogo de Produtos
* 🔐 Login Administrativo
* 📊 Dashboard
* ✏️ Cadastro/Edição de Produtos

---

# 📖 Sobre

Este projeto foi desenvolvido para resolver um cenário comum em pequenos negócios: a necessidade de vender online sem a complexidade de um e-commerce tradicional.

Ao invés de implementar carrinho, checkout e gateway de pagamento, a aplicação prioriza um fluxo simples e direto. O cliente navega pela vitrine, escolhe um produto e inicia uma conversa no WhatsApp com uma mensagem personalizada contendo automaticamente as informações do item selecionado.

Além da vitrine pública, a aplicação possui um painel administrativo privado para gerenciamento completo do catálogo.

---

# ✨ Funcionalidades

## 🛍️ Loja

* Catálogo de produtos
* Filtro por categorias
* Paginação
* Modal de detalhes do produto
* Geração automática de mensagens para o WhatsApp
* Interface responsiva

## 🔐 Painel Administrativo

* Login utilizando JWT
* Proteção de rotas com Middleware
* Cadastro de produtos
* Edição de produtos
* Exclusão de produtos
* Alteração do status de estoque
* Upload de imagens
* Paginação do painel administrativo

---

# 🛠️ Tecnologias

| Categoria      | Tecnologias                                           |
| -------------- | ----------------------------------------------------- |
| Front-end      | Next.js 16, React, TypeScript                         |
| Estilização    | Tailwind CSS                                          |
| Banco de Dados | PostgreSQL                                            |
| ORM            | Prisma 7                                              |
| Validação      | Zod                                                   |
| Autenticação   | JWT + Cookies HttpOnly                                |
| Arquitetura    | Server Components, Client Components e Server Actions |

---

# 🏛️ Arquitetura

O projeto foi organizado seguindo uma separação clara entre interface, regras de negócio e acesso ao banco.

```text
Cliente
     │
     ▼
Server Components
     │
     ▼
Server Actions
     │
     ▼
Camada lib/data
     │
     ▼
Prisma ORM
     │
     ▼
PostgreSQL
```

### Fluxo de leitura

```text
PostgreSQL
      │
      ▼
Prisma
      │
      ▼
lib/data/products.ts
      │
      ▼
Server Component
      │
      ▼
Client Component
      │
      ▼
Interface
```

### Fluxo de escrita

```text
Formulário
      │
      ▼
Upload das imagens
      │
      ▼
Server Action
      │
      ▼
lib/data/products.ts
      │
      ▼
Prisma
      │
      ▼
PostgreSQL
      │
      ▼
revalidatePath()
      │
      ▼
router.refresh()
```

---

# 🔒 Autenticação

O painel administrativo utiliza autenticação baseada em JWT.

Após o login, um token é armazenado em um cookie seguro da aplicação. Todas as rotas administrativas passam por um Middleware responsável por validar o token antes da renderização da página.

Caso o usuário não esteja autenticado ou o token esteja expirado, ele é redirecionado automaticamente para a página de login.

---

# 📂 Organização do Projeto

```text
app/
 ├── actions/
 ├── admin/
 ├── login/
 ├── products/
 └── page.tsx

components/
 ├── admin/
 ├── product/
 └── ui/

lib/
 ├── data/
 ├── schemas/
 ├── prisma.ts
 ├── types.ts
 └── utils.ts

prisma/
 └── schema.prisma
```

<details>

<summary><strong>Detalhes da arquitetura</strong></summary>

### Prisma

Responsável pelo mapeamento do banco de dados e acesso ao PostgreSQL.

### lib/data

Camada responsável pelas regras de acesso ao banco.

Nenhum componente Client importa diretamente o Prisma.

### Server Actions

Recebem as requisições vindas da interface, validam os dados e executam operações de escrita utilizando a camada `lib/data`.

### Server Components

Buscam os dados no servidor antes da renderização da página.

### Client Components

Responsáveis apenas pela interação do usuário.

</details>

---

# 🚀 Como executar

Clone o projeto

```bash
git clone https://github.com/seuusuario/repositorio
```

Instale as dependências

```bash
npm install
```

Configure o arquivo `.env.local`

```env
DATABASE_URL=

JWT_SECRET=

NEXT_PUBLIC_WHATSAPP_NUMBER=

NEXT_PUBLIC_STORE_NAME=
```

Execute

```bash
npm run dev
```

---

# 🎯 Principais desafios técnicos

Durante o desenvolvimento deste projeto foram implementados:

* Arquitetura utilizando Server Components e Client Components
* Server Actions para operações de escrita
* Persistência utilizando Prisma ORM
* Autenticação baseada em JWT
* Middleware para proteção de rotas
* Upload de imagens
* Paginação na área pública e administrativa
* Revalidação de cache com `revalidatePath()`
* Atualização imediata da interface utilizando `router.refresh()`

---

# 👨‍💻 Autor

Desenvolvido por **Mizael SemM**.

GitHub: https://github.com/MizaelSemM
