import ErrorResponseInterface from "../models/ErrorResponseInterface";

const HttpUtilsService = {

    parseFetchResponse: async (fetchResponse:Response ) => {
        if(!fetchResponse.ok) {
            const error:ErrorResponseInterface = await fetchResponse.json();
            // return error;
            throw new Error(JSON.stringify(error));

        }
        return await fetchResponse.json();
    }
};

export default HttpUtilsService;