"use strict";
const constants = require("../../utils/constants");

const isNumber = (item) => Number.isInteger(item);
const isString = (item) => typeof(item) === "string";

const _in = async (info) => {
    try {
        const data = {
            status: constants.STATUS.SUCCESS,
            info: info,
            request: {}
        };

        if(info.query.hasOwnProperty(constants.QUERY.DATE) && isNumber(info.query.date)){
            const date = new Date(info.query.date);
            data.request.month = date.toISOString();
        }
        else {
            return {
                status: constants.STATUS.INVALID,
                error: constants.ERROR.INVALID_DATE
            }
        }

        if(info.query.hasOwnProperty(constants.QUERY.MUSEUM) && isString(info.query.museum)){
            data.request.museum = info.query.museum;
        }
        else {
            return {
                status: constants.STATUS.INVALID,
                error: constants.ERROR.INVALID_MUSEUM
            }
        }

        return data;
    }
    catch (error) {
        return {
            status: constants.STATUS.FAILURE,
            error: error
        }
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