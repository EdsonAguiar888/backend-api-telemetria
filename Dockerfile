FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Porta padrão do NestJS
EXPOSE 3000

# Comando para iniciar o NestJS
CMD ["sh", "-c", "echo 'Aguardando 10 segundos para o MySql iniciar...' && sleep 10 && echo 'Iniciando NestJS...' && npm run start:dev"]
# CMD ["npm", "run", "start:dev"]