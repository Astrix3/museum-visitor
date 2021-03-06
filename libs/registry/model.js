"use strict";
const axios = require("axios");
const constants = require("../../utils/constants");

const fetchRecords = async (query) => {
    let response = {};
    try {
        let uri = 'https://data.lacity.org/resource/trxm-jn3c.json';
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
                    result.error = constants.ERROR.MISSING_ERROR;
                }
            }
            else {
                result.status = constants.STATUS.MISSING;
                result.error = constants.ERROR.MISSING_ERROR;
            }
            return result;
        })
        .catch ((error) => {
            console.log('------api error------', JSON.stringify(error));
            return {
                status : constants.STATUS.INVALID,
                error : error
            };
        });
    } catch (error) {
        response = {
            status : constants.STATUS.FAILURE,
            error : error
        };
    }
    finally {
        console.log('------ fetchRecords ------', response);
        return response;
    }
    
};

const formatResponse = (request, data) => {
    try {
        let response = {
            status: constants.STATUS.SUCCESS,
            data: {}
        };

        const records = []
        data.forEach(record => {
            const date = new Date(record.month);
            const month = date.toLocaleString('default', { month: constants.MONTH_STYLE });
            const year = date.getFullYear();
    
            if (request.hasOwnProperty(constants.QUERY.MUSEUM)) {
                records.push({
                    month,
                    year,
                    museum : request.museum,
                    visitors : record[request.museum]
                });
            }
            else {
                const recordKeys = Object.keys(record);
                let museums = [];
                if(!recordKeys.includes(constants.API.QUERY_PARAMETERS.MONTH)) {
                    museums = recordKeys;
                }
                else {
                    museums = recordKeys.splice(recordKeys.indexOf(constants.API.QUERY_PARAMETERS.MONTH), 1);
                }
                console.log('----------recordKeys----------', recordKeys);
                console.log('----------museums----------', museums);
                museums.forEach(museum => {
                    records.push({
                        month,
                        year,
                        museum : museum,
                        visitors : record[museum]
                    });
                })
            }
        });
        console.log('---------------records--------------', records.le);
        if(records.lenght <= 0) {
            response.status = constants.STATUS.MISSING;
            response.error = constants.ERROR.MISSING_ERROR;
        }
        else {
            response.data.result = (records.length === 1) ? records[0] : records;
        }
        return response;
    } catch (error) {
        return {
            status: constants.STATUS.FAILURE,
            error: error
        }
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