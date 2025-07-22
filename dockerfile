FROM node:18-alpine

WORKDIR /app

# Копируем package files
COPY package*.json ./

# Устанавливаем ВСЕ зависимости (включая dev типы)
RUN npm install

# Копируем prisma схему
COPY prisma ./prisma/

# Генерируем Prisma Client
RUN npx prisma generate

# Копируем исходный код (исключаем node_modules через .dockerignore)
COPY . .

# Проверяем что src папка существует
RUN ls -la src/

# Собираем приложение
RUN npm run build

# Проверяем что dist создался
RUN ls -la dist/

# Создаем папку для загрузок
RUN mkdir -p uploads

EXPOSE 3000

# Запускаем собранное приложение
CMD ["node", "dist/main"]