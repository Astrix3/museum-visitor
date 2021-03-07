"use strict";
const axios = require("axios");
const constants = require("../../utils/constants");

// Fetch records form lAC Api endpoint
const fetchRecords = async (query) => {
    let response = {};
    try {
        let uri = process.env.MUSEUM_URL;
        if (query.hasOwnProperty(constants.API.QUERY_PARAMETERS.MONTH) && query.month) {
            uri += `?month=${query.month.slice(0, -1)}`;
        }
        response = await axios.get(uri)
        .then((data) => {
            const result = {};
            if(data.hasOwnProperty(constants.API.RESPONSE)) {
                if (data.data.length > 0) {
                    result.status = constants.STATUS.SUCCESS;
                    result.data = data.data;
                }
                else {
                    result.status = constants.STATUS.MISSING;
                    result.error = constants.ERROR.NO_RECORD;
                }
            }
            else {
                result.status = constants.STATUS.MISSING;
                result.error = constants.ERROR.NO_RECORD;
            }
            return result;
        })
        .catch ((error) => {
            console.log('------api error------', error);
            throw ({
                status : constants.STATUS.INVALID,
                message : error
            });
        });
    } catch (error) {
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

// Format the records in the {month, year, museum, vistor} format
const formatResponse = (request, data) => {
    let response = {
        status: constants.STATUS.SUCCESS,
        data: {}
    };
    try {
        const records = data.map(record => {
            const date = new Date(record.month);
            const month = date.toLocaleString('default', { month: constants.MONTH_STYLE });
            const year = date.getFullYear();
            if (Object.keys(record).includes(request.museum)) {
                return {
                    month,
                    year,
                    museum : request.museum,
                    visitors : record[request.museum]
                };
            }
        })
        .filter(item => item !== undefined && item !== null);

        if(records.length <= 0) {
            response.status = constants.STATUS.MISSING;
            response.error = constants.ERROR.NO_RECORD;
        }
        else {
            response.data.result = (records.length === 1) ? records[0] : records;
        }
        return response;
    } catch (error) {
        response.status = constants.STATUS.FAILURE,
        response.error = error
    }
    finally{
        console.log('---------------formatResponse---------------', response);
        return response;
    }
};


const dispatch = async(request) => {
    const result = await fetchRecords(request);

    if (result.status !== constants.STATUS.SUCCESS) {
        return result;
    }
    
    return formatResponse(request, result.data);
}

module.exports = dispatch;