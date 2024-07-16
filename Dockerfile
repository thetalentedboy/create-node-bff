FROM node:18-slim AS builder
COPY . /usr/app     
WORKDIR /usr/app
RUN cd /usr/app && npm install --legacy-peer-deps
CMD ["npm", "run", "prod"]