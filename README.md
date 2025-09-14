# 🏐 Galera do Vôlei API

Bem-vindo à API do projeto "Galera do Vôlei". Este é um backend simples, construído com Node.js, Express e TypeScript, projetado para gerenciar partidas e jogadores de vôlei.

A API utiliza Zod para validação de dados de entrada, garantindo que apenas informações válidas sejam processadas, e segue uma arquitetura organizada com separação de responsabilidades (rotas, controllers, schemas).

## ✨ Funcionalidades

* Gerenciamento de Partidas (CRUD - Criar, Ler, Atualizar).
* Gerenciamento de Jogadores (CRUD - Criar, Ler).
* Validação de dados de entrada com Zod.
* Estrutura de projeto escalável e organizada.

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente local.

**Pré-requisitos:**
* [Node.js](https://nodejs.org/) (versão 14 ou superior)
* [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)
* Um cliente de API como [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/) para testar os endpoints.

**Passo a passo:**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/galera-do-volei.git](https://github.com/seu-usuario/galera-do-volei.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd galera-do-volei
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

Após executar o último comando, você verá a mensagem `🏐 Servidor "Galera do Vôlei" rodando na porta 3333!` no seu terminal. A API agora está pronta para receber requisições.

## Endpoints da API

Todos os endpoints são prefixados com `/api`.

---

### 🤾 Partidas

Recursos para gerenciar as partidas.

#### `POST /api/partidas`

Cria uma nova partida.

* **Método:** `POST`
* **Corpo da Requisição (Body):** `JSON`
* **Exemplo de Corpo:**
    ```json
    {
      "data_hora": "2025-10-20T20:30:00.000Z",
      "local": "Ginásio Principal",
      "categoria": "Dupla Masculina - Avançado"
    }
    ```
* **Resposta de Sucesso:** `201 Created` com os dados da partida criada, incluindo o `id` gerado pelo servidor.

---

#### `GET /api/partidas`

Lista todas as partidas cadastradas.

* **Método:** `GET`
* **Resposta de Sucesso:** `200 OK` com um array de objetos de partidas.

---

#### `GET /api/partidas/:partidaId`

Busca uma partida específica pelo seu ID.

* **Método:** `GET`
* **Parâmetro de URL:** `partidaId` (O ID único da partida)
* **Exemplo de URL:** `http://localhost:3333/api/partidas/a4b1c2d3-e4f5-g6h7-i8j9-k0l1m2n3o4p5`
* **Resposta de Sucesso:** `200 OK` com o objeto da partida encontrada.
* **Resposta de Erro:** `404 Not Found` se a partida não existir.

---

#### `PUT /api/partidas/:partidaId`

Atualiza os dados de uma partida existente.

* **Método:** `PUT`
* **Parâmetro de URL:** `partidaId` (O ID único da partida)
* **Corpo da Requisição (Body):** `JSON` com os campos a serem atualizados.
* **Exemplo de Corpo:**
    ```json
    {
      "local": "Ginásio Secundário",
      "categoria": "Dupla Masculina - Intermediário"
    }
    ```
* **Resposta de Sucesso:** `200 OK` com o objeto completo da partida atualizada.

---

### 🧑‍🤝‍🧑 Jogadores

Recursos para gerenciar os jogadores.

#### `POST /api/jogadores`

Cria um novo jogador.

* **Método:** `POST`
* **Corpo da Requisição (Body):** `JSON`
* **Exemplo de Corpo:**
    ```json
    {
      "nome": "Carlos Silva",
      "sexo": "Masculino",
      "categoria_idade": "Adulto"
    }
    ```
* **Resposta de Sucesso:** `201 Created` com os dados do jogador criado.

---

#### `GET /api/jogadores`

Lista todos os jogadores cadastrados.

* **Método:** `GET`
* **Resposta de Sucesso:** `200 OK` com um array de objetos de jogadores.

---

## 🛠️ Tecnologias Utilizadas

* **Node.js:** Ambiente de execução JavaScript.
* **TypeScript:** Superset do JavaScript com tipagem estática.
* **Express.js:** Framework para construção de APIs.
* **Zod:** Biblioteca para validação de schemas.
* **ts-node-dev:** Ferramenta para desenvolvimento em TypeScript com recarregamento automático.

## ✒️ Autor

* **Marcos Gabriel**
