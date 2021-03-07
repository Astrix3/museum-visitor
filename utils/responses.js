"use strict";

const headers = require('./constants').HEADERS;

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

module.exports.forbidden = () => {
  return {
    statusCode : 403,
    headers : headers,
    body : JSON.stringify({
      message: "Forbidden"
    })
  };
}