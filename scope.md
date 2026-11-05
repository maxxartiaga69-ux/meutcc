# SCOPE — meu tcc: Diário Gamer

## 1. Sobre o Projeto

O **meu tcc — Diário Gamer** é uma plataforma web para jogadores pesquisarem, organizarem e avaliarem jogos.

O projeto terá uma experiência inspirada conceitualmente no Letterboxd, porém totalmente voltada para jogos eletrônicos e com identidade visual própria.

---

## 2. Objetivo

Criar uma plataforma onde usuários possam:

* Criar uma conta e fazer login.
* Pesquisar jogos.
* Visualizar informações dos jogos.
* Avaliar jogos de 1 a 5 estrelas.
* Escrever comentários.
* Ver avaliações de outros usuários.
* Organizar jogos por status.
* Possuir uma biblioteca pessoal.
* Ter um perfil com suas avaliações e estatísticas.

---

## 3. Funcionalidades Principais

### Usuários

* Cadastro.
* Login e logout.
* Perfil do usuário.
* Username e avatar.
* Histórico de avaliações.

### Jogos

* Pesquisa de jogos.
* Cards com capas.
* Página individual do jogo.
* Informações básicas.
* Média das avaliações.

### Avaliações

* Nota de 1 a 5 estrelas.
* Comentários.
* Data da avaliação.
* Exibição das avaliações dos usuários.

### Status

Cada usuário poderá organizar seus jogos como:

* **Zerado**
* **Jogando**
* **Desejado**

### Biblioteca

O usuário poderá visualizar seus jogos separados por status e seus jogos avaliados.

---

## 4. Tecnologias

### Front-end

* React
* Vite
* HTML
* CSS
* JavaScript/TypeScript

### Back-end

* Node.js
* Express
* Zod

### Banco de Dados

* PostgreSQL
* Neon
* Drizzle ORM

---

## 5. Estrutura do Banco

O sistema terá, inicialmente, as seguintes tabelas:

### usuarios

Armazena os dados das contas dos usuários.

### jogos

Armazena os jogos cadastrados.

### avaliacoes

Armazena as avaliações feitas pelos usuários e possui relacionamento com os jogos.

---

## 6. API

Principais rotas:

```text
GET    /jogos
GET    /jogos/:id
GET    /jogos/buscar?q=
POST   /avaliacoes
GET    /avaliacoes/jogo/:jogoId

POST   /auth/register
POST   /auth/login
POST   /auth/logout
GET    /auth/me

GET    /usuarios/:username
```

---

## 7. Escopo

O projeto contempla o desenvolvimento de uma aplicação Full Stack completa, incluindo:

**Front-end + Back-end + Banco de Dados + API + Autenticação + Avaliações + Perfis + Biblioteca de Jogos.**

O sistema será desenvolvido para funcionar em computadores, tablets e celulares.

---

## 8. Fora do Escopo

Não fazem parte da versão inicial:

* Compra ou venda de jogos.
* Sistema de pagamentos.
* Download de jogos.
* Streaming.
* Chat em tempo real.
* Plataforma de distribuição de jogos.

---

## 9. Referência

O projeto utiliza o **Letterboxd como referência conceitual** para funcionalidades como contas, perfis, avaliações, pesquisa e organização pessoal.

A interface e a identidade visual do **meu tcc** serão próprias e voltadas ao universo dos jogos.
