<p align="center">
  <a href="https://github.com/nestjs/nest" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

Backend - Teste Técnico SEIDOR
Este projeto é um backend desenvolvido como teste técnico para a SEIDOR. Ele implementa uma API RESTful utilizando Node.js, NestJS, Prisma e PostgreSQL, seguindo princípios de Clean Code, DDD e arquitetura hexagonal. O objetivo é gerenciar cadastro de carros, motoristas e agendamentos seguindo a documentação fornecida.

### Pré-requisitos

Certifique-se de que o Docker está instalado e em execução.

Verifique se as portas 3000 (backend) e 5432 (banco de dados) estão livres.

## Rodando o Projeto

### 1. Clone o repositório

```bash
git clone git@github.com:Hagave/SEIDOR_TT-BE.git
```

```bash
cd SEIDOR_TT-BE
```

### Caso não tenha o pnpm instalado, por favor, instale. Se já possúi, pode ignorar essa etapa.

```bash
npm install -g pnpm
```

### 2. Configure as variáveis de ambiente

Renomeie o arquivo .env.example para .env.

```bash
Não é necessário fazer mudanças. Caso queira alterar a conexão, não esqueça que deve também alterar o docker-compose.yml dentro de .container para que reflita suas mudaças ,
```

### 3. Instale as dependências

```bash
pnpm install
```

### 4. Suba os contêineres Docker

Na pasta container, construa e inicie os serviços:

```bash
cd .container
```

```bash
docker-compose up --build -d
```

Verifique se os contêineres estão em execução:

```bash
docker-compose ps
```

### 5. Execute as migrations do Prisma

Volte para a raiz do projeto e execute as migrations:

```bash
cd ..
```

```bash
npx prisma migrate dev --name seedDb
```

### 6. Inicie o backend

```bash
pnpm run start
```

O backend estará disponível em http://localhost:3000.

### Testando rotas

### Caso tenha o insomnia ou postman, você pode importar o arquivo SEIDOR_INSOMNIA_FILE que contém todas as rotas para facilitar os testes

```bash
SEIDOR_INSOMNIA_FILE
```


## Não é possível deletar um carro ou motorista que está vinculado a um agendamento.


Parando os Contêineres

Para parar os serviços Docker:

```bash
cd container
```

```bash
docker-compose down
```

## Executando Testes

Para rodar os testes unitários com Jest:

```bash
pnpm run test
```

## Tecnologias Utilizadas

✅ Back-end: Node.js / NestJS

✅ Arquitetura: Clean Code / DDD / Hexagonal

✅ Infra: Docker / Prisma / PostgreSQL

✅ Testes: Jest

## Contatos

[Héverton Vinícius - Perfil LinkedIn](https://www.linkedin.com/in/heverton-vinicius/)

Email: hagavepro@gmail.com
