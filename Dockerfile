FROM node:20.11.0 as planify-joelgpay

WORKDIR /srv/app

RUN apt update
RUN apt install vim -y

COPY package.json ./

# Node: --legacy-peer-deps && npm cache clean --force
RUN npm install --quiet

EXPOSE 5173
