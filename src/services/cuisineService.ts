import CuisineTypeInterface from "../models/CuisineTypeInterface"
import { HttpUtilsService } from ".";
import config from '../config/env';
import ErrorResponseInterface from "../models/ErrorResponseInterface";

const { 
    API_URL,
    HTTP_METHODS,
    HEADERS_DEFAULT,
} = config;

const CuisineService = {

    getCuisineTypes: async ():Promise<CuisineTypeInterface[]> => {
        
        const result = await fetch(`${API_URL}/cuisine-types/find-all`, 
            {
                method: HTTP_METHODS.GET,
                headers: HEADERS_DEFAULT,
            }
        );
       return await HttpUtilsService.parseFetchResponse(result);
    }
};

export default CuisineService;