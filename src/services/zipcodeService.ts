import config from '../config/env';
import ErrorResponseInterface from '../models/ErrorResponseInterface';
import ZipcodeInterface from '../models/ZipcodeInterface';
const { API_URL } = config;

const ZipcodeService = {

    fetchAllZipcodes: async():Promise<ZipcodeInterface[]> => {
        const results = await fetch(`${API_URL}/zipcodes/find-all`);
        if(!results.ok){
            const errorJson = await results.json();
            const err:ErrorResponseInterface = {
                error: errorJson.error,
                status: errorJson.status,
                timestamp: errorJson.timestamp,
                errorType: errorJson.message,
            };
            throw new Error(JSON.stringify(err));
        }
        return await results.json();
    }
};

export default ZipcodeService;