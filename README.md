## Introduction

This application is a sample of nodejs-server and node-rest api. Using [Museum Visitors](https://data.lacity.org/Arts-Culture/Museum-Visitors/trxm-jn3c) data set.

Click here for [Swagger.yml](https://app.swaggerhub.com/apis/Astrix3/joinAssemblyMuseum/0.1).

## Setting up project

1. Clone the repo and <b>cd</b> into the folder.
2. Run - <b>npm ready</b> or <b> npm run</b> ready in termial.
3. create .env file at root of project and copy the below config:
<pre>
MUSEUM_URL='https://data.lacity.org/resource/trxm-jn3c.json'
PORT=3000
HOST=localhost
</pre>
4. To start your server run - <b>npm start</b> or <b>npm run start</b>.
5. You are ready to consume the api. please use [Swagger.yml](https://app.swaggerhub.com/apis/Astrix3/joinAssemblyMuseum/0.1) as reference to execute the api

To run test cases and coverage run - <b>npm test</b> or <b>npm run test</b>.
