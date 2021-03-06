"use strict";
const constants = require("../../utils/constants");

const isNumber = (item) => Number.isInteger(item);
const isString = (item) => typeof(item) === "string";

const _in = async (info) => {
    let response = {
        status: constants.STATUS.SUCCESS,
        request: {}
    };
    try {
        if(info.query.hasOwnProperty(constants.QUERY.DATE) && isNumber(info.query.date)){
            const date = new Date(info.query.date);
            response.request.month = date.toISOString();
        }
        else if (!info.query.hasOwnProperty(constants.QUERY.DATE)){
            throw ({
                status: constants.STATUS.INVALID,
                error: constants.ERROR.MISSING_DATA(constants.QUERY.DATE)
            });
        }
        else {
            throw ({
                status: constants.STATUS.INVALID,
                error: constants.ERROR.INVALID_DATA(constants.QUERY.DATE)
            });
        }

        if(info.query.hasOwnProperty(constants.QUERY.MUSEUM) && isString(info.query.museum)){
            response.request.museum = info.query.museum;
        }
        else if (!info.query.hasOwnProperty(constants.QUERY.MUSEUM)){
            throw ({
                status: constants.STATUS.INVALID,
                error: constants.ERROR.MISSING_DATA(constants.QUERY.MUSEUM)
            });
        }
        else {
            throw ({
                status: constants.STATUS.INVALID,
                error: constants.ERROR.INVALID_DATA(constants.QUERY.MUSEUM)
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