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

        console.log("-----validate-in-----", params);
        result = await validate.in(params);
        if (result.status !== constants.STATUS.SUCCESS) {
            throw ({
                status: result.status,
                message: result.error
            });
        }
        console.log("-----model-in-----", result);
        result = await model(result.request);
        console.log("-----model-out-----", result);
        if (result.status !== constants.STATUS.SUCCESS) {
            throw ({
                status: result.status,
                message: result.error
            });
        }
        result = await validate.out(result);
        console.log("-----validate-out-----", result);
        if (result.status !== constants.STATUS.SUCCESS) {
            throw ({
                status: result.status,
                message: result.error
            });
        }
        return responses.success(result.data);

    } catch (error) {
        console.log("-----error----", error);
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
        console.log(error);
        return responses.failure(error);
    }
};
