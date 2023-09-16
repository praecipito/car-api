FROM node:16-alpine
# ENV NODE_ENV=production
WORKDIR /app
EXPOSE 3000
COPY . .
RUN npm ci
RUN npm run build
ENTRYPOINT npm start
