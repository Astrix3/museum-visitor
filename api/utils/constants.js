"use strict";

const statusType  = {
    SUCCESS: 'success',
    FAILURE: 'failure',
    INVALID: 'invalid',
    MISSING: 'MISSING'
};

const error = {
    NO_RECORD : 'no record found',
    INVALID_DATA : (item) => `invalid value of [${item}] received`,
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

module.exports.STATUS = statusType;
module.exports.ERROR = error;
module.exports.QUERY = queryStringParameters;
module.exports.API = api;
module.exports.MONTH_STYLE = monthStyle;