FROM node:22-alpine
WORKDIR /ProjectApp
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]