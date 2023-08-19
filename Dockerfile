FROM node:16-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY [".", "."]
RUN npm install --silent
RUN npm run build
RUN npm start
