"use strict";

const endPoint = '/api/visitors';

const requestMethod = 'GET';

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-*": "*",
    "Access-Control-Allow-Headers": "*",
    "node-cache": "Missed node-cache",
    "Content-Type": "application/json"
};

const statusType  = {
    SUCCESS: 'success',
    FAILURE: 'failure',
    INVALID: 'invalid',
    MISSING: 'missing'
};

const error = {
    NO_RECORD : 'no record found',
    INVALID_DATA : (item) => {
        let message= `invalid [${item}] format received.`;
        if (item === queryStringParameters.DATE) {
            message += ' Expected format: epoch timestamp [0-9] in milliseconds. eg: 1388534400000';
        }
        return message
        
    },
    MISSING_DATA : (item) => `missing [${item}] parameter from request`,
};

const queryStringParameters = {
    DATE: 'date',
    MUSEUM: 'museum'
};

const api = {
    QUERY_PARAMETERS: {
        MONTH: 'month'
    },
    RESPONSE: 'data'
};

const monthStyle = 'long';

module.exports.API_END_POINT = endPoint;
module.exports.REQUEST_METHOD = requestMethod;
module.exports.HEADERS = headers;
module.exports.STATUS = statusType;
module.exports.ERROR = error;
module.exports.QUERY = queryStringParameters;
module.exports.API = api;
module.exports.MONTH_STYLE = monthStyle;