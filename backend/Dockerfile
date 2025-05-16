FROM node:22-alpine3.19

# dependency installation
COPY package*.json .

RUN npm i 

# building production folder
COPY . . 

RUN npm run build

# running production
CMD ["node", "/build/index.js"]