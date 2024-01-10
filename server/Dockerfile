FROM node:20
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY prisma ./prisma
COPY .env ./.env
RUN yarn prisma:generate
COPY . ./
EXPOSE 3000
CMD ["npm", "run", "start:migrate:dev"]
