"use strict";

const responses = require("../utils/responses.js");
const constants = require("../utils/constants");
const validate = require("../libs/registry/validate");
const model = require("../libs/registry/model.js");

const handle = async (event, context) => {
    try {
        let result = null;
        let params = {
            query: event.queryStringParameters || {}
        };
        
        // Validate query parameters
        
        result = validate.in(params);
        if (result.status !== constants.STATUS.SUCCESS) {
            throw ({
                status: result.status,
                message: result.error
            });
        }

        // Filtered request parameters are passed to model for data fetching and processing
        result = await model(result.request);

        if (result.status !== constants.STATUS.SUCCESS) {
            throw ({
                status: result.status,
                message: result.error
            });
        }

        // Validating response
        result = validate.out(result);

        if (result.status !== constants.STATUS.SUCCESS) {
            throw ({
                status: result.status,
                message: result.error
            });
        }
        return responses.success(result.data);

    } catch (error) {
        console.log("----- error ----", error);
        if (error.status === constants.STATUS.MISSING) {
            return responses.missing(error.message);
        }
        else if (error.status === constants.STATUS.INVALID) {
            return responses.invalid(error.message);
        }
        else {
            return responses.failure(error.message);
        }
    }
};

module.exports.list = async (event, context, callback) => {
    try {
        return await handle(event, context);
    }
    catch (error) {
        console.log("-----list error ----", error);
        return responses.failure(error);
    }
};
