# versions.login

versions.login modulo do projeto responsável por realizar o login do usuário e seu cadastro.
Aqui é onde temos os endpoint disponíveis para serem consumidos por um front end por exemplo.
Este modulo tem comunicação com o `versions.usuarios` e com `versions.auth`, cada um com sua responsabilidade e o modulo login intermediando a comunicação entre os dois serviços.
O projeto do login esta todo documentado com o swagger sendo possível visualizar seus endpoint e os requisitos de cada endpoint.

## Tecnologias Utilizadas

- **Linguagem de Programação**: TypeScript
- **Framework**: NestJS (framework progressivo para Node.js)
- **Gerenciador de Pacotes**: npm

## Estrutura do Projeto

- **`src/`**: Diretório principal do código-fonte
  - `app.module.ts`
  - `app.controller.ts`
  - `app.service.ts`
  - `main.ts`
  - **`const/`**: Constantes ultilizadas no projeto
    - `commandsAuth.const.ts`
    - `commandsUsuario.const.ts`
    - `services.const.ts`
  - **`dto/`**: DTOs ultilizados no projeto
    - **`request/`**: DTOs das requests
      - `authLogin.dto.ts`
    - **`response/`**: DTOs das response
      - `authLogin.dto.ts`

## Instalação

1. Clone o repositório:

   ```
   git clone https://github.com/JoaoVitorGirardii/versions.login.git
   cd versions.login
   ```

2. Instale as dependências:
   ```
   npm install
   ```

### Executando a Aplicação

- Inicie no modo de desenvolvimento:

  ```
  npm run start:dev
  ```

### endpoint disponivel

- `/login​`: Realiza o login do usuário.
  ```
    {
      "user": "teste@email.com",
      "password": "teste"
    }
  ```
- `/login/create`: Realiza a criação de um novo usuário.
  ```
    {
      "user": "teste@email.com",
      "name": "teste teste zezinho",
      "password": "teste"
    }
  ```
