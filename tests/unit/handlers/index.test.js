require('dotenv').config();

const index = require('../../../handlers/index');
const apiconstants = require('../../config/constants');
const responses = require('../../../utils/responses');
const constants = require('../../../utils/constants');

describe('Testing Index.js', () => {

    test('Should return successful response', async() => {
        const event = {
            queryStringParameters: apiconstants.REQUEST
        };

        const response = responses.success(apiconstants.RESPONSE);
        const result = await index.list(event);
        expect(result).toMatchObject(response);
    });

    test('Date missing: Should return unsuccessful with error 400', async() => {
        const event = {
            queryStringParameters: {
                museum: apiconstants.REQUEST
            }
        };

        const response = responses.invalid(constants.ERROR.MISSING_DATA(constants.QUERY.DATE));
        const result = await index.list(event);
        expect(result).toMatchObject(response);
    });

    test('Invalid Date: Should return unsuccessful with error 400', async() => {
        const event = {
            queryStringParameters: {
                museum: apiconstants.REQUEST,
                date: 'abc'
            }
        };

        const response = responses.invalid(constants.ERROR.INVALID_DATA(constants.QUERY.DATE));
        const result = await index.list(event);
        expect(result).toMatchObject(response);
    });

    test('Museum missing: Should return unsuccessful with error 400', async() => {
        const event = {
            queryStringParameters: {
                date: apiconstants.REQUEST.date,
            }
        };

        const response = responses.invalid(constants.ERROR.MISSING_DATA(constants.QUERY.MUSEUM));
        const result = await index.list(event);
        expect(result).toMatchObject(response);
    });

    test('Invalid Date: Should return unsuccessful with error 400', async() => {
        const event = {
            queryStringParameters: {
                museum: null,
                date: apiconstants.REQUEST.date
            }
        };

        const response = responses.invalid(constants.ERROR.INVALID_DATA(constants.QUERY.MUSEUM));
        const result = await index.list(event);
        expect(result).toMatchObject(response);
    });

    test('Museum not present in response: Should return unsuccessful with error 404', async() => {
        const event = {
            queryStringParameters: {
                date: apiconstants.REQUEST.date,
                museum: 'abc'
            }
        };

        const response = responses.missing(constants.ERROR.NO_RECORD);
        const result = await index.list(event);
        expect(result).toMatchObject(response);
    });

    test('No record on Date: Should return unsuccessful with error 404', async() => {
        const event = {
            queryStringParameters: {
                museum: apiconstants.REQUEST.museum,
                date: '123'
            }
        };

        const response = responses.missing(constants.ERROR.NO_RECORD);
        const result = await index.list(event);
        expect(result).toMatchObject(response);
    });
})