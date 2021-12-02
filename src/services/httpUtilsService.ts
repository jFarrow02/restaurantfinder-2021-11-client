const HttpUtilsService = {

    parseFetchResponse: async (fetchResponse:Response ) => {
        if(!fetchResponse.ok) {
            const error = await fetchResponse.json();
            return error;
        }
        return await fetchResponse.json();
    }
};

export default HttpUtilsService;