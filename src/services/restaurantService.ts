import RestaurantInterface from "../models/RestaurantInterface";
import config from '../config/env';
import HttpUtilsService from "./httpUtilsService";
import ErrorResponseInterface from "../models/ErrorResponseInterface";

const RestaurantService = {

    async findAllRestaurants(): Promise<RestaurantInterface[] | ErrorResponseInterface> {
        const results = await fetch(`${config.API_URL}/restaurants/find-all`,
            {
                method: config.HTTP_METHODS.GET,
                headers: { ...config.HEADERS_DEFAULT },
            }
        );

        return HttpUtilsService.parseFetchResponse(results);
    },

    async findRestaurantsByBorough(borough: string): Promise<RestaurantInterface[] | ErrorResponseInterface> {
        const results = await fetch(`${config.API_URL}/restaurants/find-many/borough/${borough}`,
            {
                method: config.HTTP_METHODS.GET,
                headers: { ...config.HEADERS_DEFAULT},
            }
        );
        return HttpUtilsService.parseFetchResponse(results);
    },

    async findRestaurantByName(name: string): Promise<RestaurantInterface | ErrorResponseInterface> {
        const result = await fetch(`${config.API_URL}/restaurants/find-one/name/${name}`,
            {
                method: config.HTTP_METHODS.GET,
                headers: { ...config.HEADERS_DEFAULT },
            }
        );

        return HttpUtilsService.parseFetchResponse(result);   
    },

    async findRestaurantsByCuisineType(type: string): Promise<RestaurantInterface[] | ErrorResponseInterface> {
        const results = await fetch(`${config.API_URL}/restaurants/find-many/cuisine/${type}`,
            {
                method: config.HTTP_METHODS.GET,
                headers: { ...config.HEADERS_DEFAULT },
            }
        );
        return HttpUtilsService.parseFetchResponse(results);
    },

    async findRestaurantsByAverageGrade(grade: string): Promise<RestaurantInterface[] | ErrorResponseInterface> {
        const results = await fetch(`${config.API_URL}/restaurants/find-many/avg-grade/${grade}`,
            {
                method: config.HTTP_METHODS.GET,
                headers: { ...config.HEADERS_DEFAULT },
            }
        );
        return HttpUtilsService.parseFetchResponse(results);
    },
}

export default RestaurantService;