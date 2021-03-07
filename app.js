'use strict';

require('dotenv').config()

const http = require('http');
const url = require('url');
const api = require('./handlers/index');
const response = require('./utils/responses');
const constant = require('./utils/constants')

const server = http.createServer(async(req, res) => {
    const parsedURL = url.parse(req.url, true);
    let apiResponse = null;
    
    // Only allow speficied end point and GET method
    // All other method and endpoint will be marked as FORBIDDEN

    if(parsedURL.pathname === constant.API_END_POINT && req.method === constant.REQUEST_METHOD) {
        const event = {
            queryStringParameters: JSON.parse(JSON.stringify(parsedURL.query)),
        }
        apiResponse = await api.list(event);
    }
    else {
        apiResponse = response.forbidden;
    }
    
    // Sending response
    res.writeHead(apiResponse.statusCode, apiResponse.headers);
    res.end(apiResponse.body);
});

server.listen(process.env.PORT, process.env.HOST, ()=>{
    console.log(`Server started on port ${process.env.PORT} and host ${process.env.HOST}`);
    console.log(`URL: http://${process.env.HOST}:${process.env.PORT}`);
    console.log(`API: [${constant.REQUEST_METHOD}] http://${process.env.HOST}:${process.env.PORT}${constant.API_END_POINT}`);    
});