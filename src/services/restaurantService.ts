import { RestaurantInterface } from "../models/RestaurantInterface";
import config from '../config/env';
import { HttpRequestInterface } from "../models/HttpRequestInterface";
import requestHeaders from "../models/RequestHeaders";

const RestaurantService = {

    async findAllRestaurants(): Promise<RestaurantInterface[]> {
        return [];
    },

    async findRestaurantsByBorough(borough: string): Promise<RestaurantInterface[]> {
        return [];
    },

    async findRestaurantByName(name: string) {
        const result = await fetch(`${config.API_URL}/restaurants/find-one/name/${name}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': '',
                    'Accept': '*/*',
                    'Accept-Encoding': '',
                    'Connection': 'keep-alive',
                },
            }
        );
        return result;   
    },

    async findRestaurantsByCuisineType(type: string): Promise<RestaurantInterface[]> {
        return [];
    },

    async findRestaurantsByAverageGrade(grade: string): Promise<RestaurantInterface[]> {
        return [];
    },
}

export default RestaurantService;