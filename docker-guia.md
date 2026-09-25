Passo a Passo: Docker Compose Backend + MySQL
  


Passo a Passo: Conectar Backend NestJS ao MySQL via Docker Compose
1. Criar a rede compartilhada no Docker (se ainda não existir)
docker network create rede_compartilhada
2. Configurar o docker-compose.yml do banco de dados (MySQL)
services:
  mysql_db:
    image: mysql:8.0
    container_name: container_mysql_telemetria
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: telemetria_db
      MYSQL_USER: telemetria_user
      MYSQL_PASSWORD: telemetria_pass
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - rede_compartilhada

volumes:
  mysql_data:

networks:
  rede_compartilhada:
    external: true
3. Garantir a instalação das dependências no projeto NestJS
npm install mysql2 class-validator class-transformer
4. Configurar a conexão do TypeORM no app.module.ts
TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST || 'container_mysql_telemetria',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'telemetria_user',
  password: process.env.DB_PASSWORD || 'telemetria_pass',
  database: process.env.DB_DATABASE || 'telemetria_db',
  entities: [ImovelEntity, MedidorEntity, LeituraEntity],
  synchronize: true,
})
5. Criar o docker-compose.yml na pasta do Backend
services:
  backend:
    container_name: container_backend_telemetria
    build:
      context: .
      dockerfile: Dockerfile
    restart: always
    ports:
      - "3000:3000"
    environment:
      DB_HOST: container_mysql_telemetria
      DB_PORT: 3306
      DB_USERNAME: telemetria_user
      DB_PASSWORD: telemetria_pass
      DB_DATABASE: telemetria_db
    networks:
      - rede_compartilhada

networks:
  rede_compartilhada:
    external: true
6. Gerar a imagem e iniciar os contêineres
docker compose down
docker compose up -d --build
7. Validar a conexão através dos logs
docker logs -f container_backend_telemetria