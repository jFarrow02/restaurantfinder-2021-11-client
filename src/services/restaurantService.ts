import RestaurantInterface from "../models/RestaurantInterface";
import config from '../config/env';
import HttpUtilsService from "./httpUtilsService";
import ErrorResponseInterface from "../models/ErrorResponseInterface";

const { HEADERS_DEFAULT, HTTP_METHODS, SEARCH_PARAMS } = config;

const RestaurantService = {

    async findAllRestaurants(): Promise<RestaurantInterface[]> {
        const results = await fetch(`${config.API_URL}/restaurants/find-all`,
            {
                method: HTTP_METHODS.GET,
                headers: { ...HEADERS_DEFAULT },
            }
        );

        return HttpUtilsService.handleFetchResponse(results);
    },

    async findRestaurantsByBorough(borough: string): Promise<RestaurantInterface[]> {
        const results = await fetch(`${config.API_URL}/restaurants/find-many/borough/${borough}`,
            {
                method: HTTP_METHODS.GET,
                headers: { ...HEADERS_DEFAULT},
            }
        );
        return HttpUtilsService.handleFetchResponse(results);
    },

    async findRestaurantByName(name: string): Promise<RestaurantInterface> {
        const result = await fetch(`${config.API_URL}/restaurants/find-one/name/${name}`,
            {
                method: HTTP_METHODS.GET,
                headers: { ...HEADERS_DEFAULT },
            }
        );

        return HttpUtilsService.handleFetchResponse(result);   
    },

    async findRestaurantsByCuisineType(type: string): Promise<RestaurantInterface[]> {
        const results = await fetch(`${config.API_URL}/restaurants/find-many/cuisine/${type}`,
            {
                method: HTTP_METHODS.GET,
                headers: { ...HEADERS_DEFAULT },
            }
        );
        return HttpUtilsService.handleFetchResponse(results);
    },

    async findRestaurantsByAverageGrade(grade: string): Promise<RestaurantInterface[]> {
        const results = await fetch(`${config.API_URL}/restaurants/find-many/avg-grade/${grade}`,
            {
                method: HTTP_METHODS.GET,
                headers: { ...HEADERS_DEFAULT },
            }
        );
        return HttpUtilsService.handleFetchResponse(results);
    },

    async findRestaurantsByZipcode(zip: string): Promise<RestaurantInterface[]> {
        const results = await fetch(`${config.API_URL}/restaurants/find-many/zipcode/${zip}`,
            {
                method: HTTP_METHODS.GET,
                headers: { ...HEADERS_DEFAULT },
            }
        );
        return HttpUtilsService.handleFetchResponse(results);
    },

    async findRestaurantsByParamAndValue(param:string, value:string):Promise<RestaurantInterface | RestaurantInterface[]> {
        let results;
        switch(param){
            case 'cuisine':
                results = await this.findRestaurantsByCuisineType(value);
                break;
            case 'name':
                results = await this.findRestaurantByName(value);
                break;
            case 'avg_grade':
                results = await this.findRestaurantsByAverageGrade(value);
                break;
            case 'zip':
                results = await this.findRestaurantsByZipcode(value);
                break;
            default:
                results = [];
        }
        return results;
    }
}

export default RestaurantService;