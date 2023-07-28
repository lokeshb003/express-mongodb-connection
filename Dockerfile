FROM ubuntu:latest

WORKDIR .

RUN apt update && apt install nodejs npm -y

COPY . .

RUN npm install

EXPOSE 4000

CMD ["npm","start"]
