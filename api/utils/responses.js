"use strict";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-*": "*",
  "Access-Control-Allow-Headers": "*",
  "node-cache": "Missed node-cache",
  "Content-Type": "application/json"
};

module.exports.success = (body) => {
  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(body),
  };
};

module.exports.invalid = (error) => {
  return {
    statusCode: 400,
    headers: headers,
    body: JSON.stringify({
      error: error,
    }),
  };
};

module.exports.missing = (error) => {
  return {
    statusCode: 404,
    headers: headers,
    body: JSON.stringify({
      error: error,
    }),
  };
};

module.exports.failure = (error) => {
  return {
    statusCode: 500,
    headers: headers,
    body: JSON.stringify({
      error: error,
    }),
  };
};

