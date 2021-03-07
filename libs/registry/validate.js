"use strict";
const constants = require("../../utils/constants");

// Convert any input to int and checks if it is a number
const isNumber = (item) => Number.isInteger(parseInt(item, 10));

// Checks if input is a string
const isString = (item) => typeof(item) === "string";

// Validate Input parameters.
const _in = (info) => {
    let response = {
        status: constants.STATUS.SUCCESS,
        request: {}
    };
    try {
        // checks for date in query and if date is a valid number
        // checks for date in query and if not found throws error
        if(info.query.hasOwnProperty(constants.QUERY.DATE) && isNumber(info.query.date)){
            const date = new Date(parseInt(info.query.date, 10));
            response.request.month = date.toISOString();
        }
        else if (!info.query.hasOwnProperty(constants.QUERY.DATE)){
            throw ({
                status: constants.STATUS.INVALID,
                message: constants.ERROR.MISSING_DATA(constants.QUERY.DATE)
            });
        }
        else {
            throw ({
                status: constants.STATUS.INVALID,
                message: constants.ERROR.INVALID_DATA(constants.QUERY.DATE)
            });
        }
        
        // checks for museum in query and if date is string
        // checks for museum in query and if not found throws error
        if(info.query.hasOwnProperty(constants.QUERY.MUSEUM) && isString(info.query.museum)){
            response.request.museum = info.query.museum;
        }
        else if (!info.query.hasOwnProperty(constants.QUERY.MUSEUM)){  
            throw ({
                status: constants.STATUS.INVALID,
                message: constants.ERROR.MISSING_DATA(constants.QUERY.MUSEUM)
            });
        }
        else {
            throw ({
                status: constants.STATUS.INVALID,
                message: constants.ERROR.INVALID_DATA(constants.QUERY.MUSEUM)
            });
        }
    }
    catch (error) {
        response = {
            status : error.hasOwnProperty('status') ? error.status : constants.STATUS.FAILURE,
            error : error.hasOwnProperty('message')? error.message : error
        };
    }
    finally {
        console.log('------ fetchRecords ------', response);
        return response;
    }
};

// Validate Output parameters.
// Nothing much to see here :)...
const out = (info) => {
    try {
        const data = {
            status: constants.STATUS.SUCCESS,
            data: info.data
        };
        return data;
    } catch (error) {
        return {
            status: constants.STATUS.FAILURE,
            error: error
        }
    }
};

module.exports.in = _in;
module.exports.out = out;