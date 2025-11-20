# Mapa Mundial — Sistema Completo de Administração

Este projeto é uma aplicação completa composta por Frontend (React + Vite) e Backend (Node.js + Express + Prisma + PostgreSQL) que permite gerenciar continentes, países e cidades, com importação automática dos dados reais da API RestCountries. <br>

O sistema possui: <br>

✅ Painel administrativo completo
✅ CRUD de Continentes
✅ CRUD de Países
✅ CRUD de Cidades
✅ Filtros Inteligentes
— Filtrar cidades por continente, país e nome
— Filtrar países por continente, nome e idioma
— Filtrar continentes por nome
✅ Layout responsivo com Navbar, Sidebar e Footer
✅ Integração com banco PostgreSQL
✅ Importação automática de Continentes, Países e Capitais

# Estrutura do Projeto

```bash
/apps
   ├── backend
   │     ├── src
   │     │     ├── controllers
   │     │     ├── routes
   │     │     ├── services
   │     │     ├── utils
   │     │     └── app.ts
   │     ├── prisma
   │     └── scripts/import.ts
   └── frontend
         ├── src
         │     ├── pages
         │     ├── components
         │     └── styles
```

# Pré-requisitos

Certifique-se de ter instalado:

<ul>
<li>Node.js 18+</li>
<li>npm ou yarn</li>
<li>PostgreSQL 14+</li>
<li>Git (opcional)</li>
</ul>

# Banco de Dados
Crie um banco no PostgreSQL:
```bash
CREATE DATABASE mapamundi;
```

# Configuração do Backend

Dentro da pasta:
```bash
apps/backend
```

Crie um arquivo:
```bash
.env
```

E coloque:
```bash
PORT=4000
CORS_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO
```
Exemplo:

```bash
DATABASE_URL=postgresql://postgres:minhasenha@localhost:5432/mapamundi
```

OBS.: Lembre-se de trocar USUARIO, SENHA e NOME_DO_BANCO pelos valores da sua máquina.

# Instalando Dependências
📌 Backend

```bash
cd apps/backend
npm install
```

📌 Frontend
```bash
cd apps/frontend
npm install
```

# Importação dos Dados (Passo Importante!)
O backend possui um script que importa:
<ul>
<li>Continentes</li>
<li>Países</li>
<li>Capitais</li>
</ul>

diretamente da API RestCountries, popularizando automaticamente o banco. <br>

O script está em:

```bash
apps/backend/scripts/import.ts
```

Para rodar o importador:

```bash
cd apps/backend
npm run import
```

Se tudo der certo, você verá:
```yaml
✔ Continentes importados
✔ Países importados
✔ Capital importada: ...
🎉 Importação concluída
```

# Executando o Backend

Ainda na pasta backend:
```bash
npm run dev
```
O servidor abrirá em:
```bash
http://localhost:4000
```

# Executando o Frontend

Em outra aba do terminal:
```bash
cd apps/frontend
npm run dev
```

A aplicação abrirá algo como:
```bash
http://localhost:5173
```

Acesse no navegador.

# Painel Administrativo

Os menus estão em:

```bash
/admin
/admin/continentes
/admin/paises
/admin/cidades
```

# Funcionalidades do Sistema

<ul>
<li><b>Continentes</b></li>
<li>Criar</li>
<li>Editar</li>
<li>Excluir</li>
<li>Listar</li>
</ul>

<ul>
<li><b>Países</b></li>
<li>Filtrar por continente</li>
<li>Filtrar por idioma</li>
<li>Buscar por nome</li>
<li>CRUD completo</li>
</ul>

<ul>
<li><b>Cidades</b></li>
<li>Filtrar por continente</li>
<li>Filtrar por país</li>
<li>Buscar por nome</li>
<li>CRUD completo</li>
</ul>


# Tecnologias Utilizadas

<b>Frontend</b>

<ul>
<li>React + Vite</li>
<li>TypeScript</li>
<li>CSS</li>
</ul>

<b>Backend</b>

<ul>
<li>Node.js</li>
<li>Express</li>
<li>Prisma ORM</li>
<li>PostgreSQL</li>
<li>RestCountries API</li>
</ul>