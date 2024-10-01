FROM ubuntu
RUN apt-get update -y
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

COPY package-lock.json package-lock.json
COPY package.json package.json
COPY index.js index.js

RUN npm install
ENTRYPOINT [ "node", "index.js" ]