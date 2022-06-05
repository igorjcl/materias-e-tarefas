# Materias e Tarefas

Sistema direcionado para estudantes se organizarem com suas atividades. Nele é possivel
cadastrar materias e atividades para cada materias.

## Tecnologias

### Backend
- Java 11
- Spring
- PostgresSQL
  
### Frontend
- Angular
- HTML
- SCSS
- Typescript
- PrimeNG

## Inicializar

### Requisitos

- Docker
- Docker Compose

### Build

Para rodar a aplicação é preciso ter intalado o `Docker` e `Docker Compose`. 
Apos a instalação basta ir na pasta raiz do projeto e ultilizar o comando
`docker compose up -d`. Esse comando fara com que o docker compose 
suba os container com o banco de dados, backend e frontend.
Apos a finalização do comando basta ir em `http://localhost:4200`.