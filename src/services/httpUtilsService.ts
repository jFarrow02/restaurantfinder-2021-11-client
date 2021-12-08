import ErrorResponseInterface from "../models/ErrorResponseInterface";

const HttpUtilsService = {

    handleFetchResponse: async (fetchResponse:Response ) => {
        if(!fetchResponse.ok){
            const errorJson = await fetchResponse.json();
            const err:ErrorResponseInterface = {
                error: errorJson.error,
                status: errorJson.status,
                timestamp: errorJson.timestamp,
                errorType: errorJson.message,
            };
            throw new Error(JSON.stringify(err));
        }
        return await fetchResponse.json();
    }
};

export default HttpUtilsService;