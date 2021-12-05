import { useState } from 'react';
import './MainContent.css';
import { BoroughSelector, AttributeSelector, RestaurantsList, Pagination } from '..';
import RestaurantInterface from '../../models/RestaurantInterface';
import config from '../../config/env';

const { ALPHABET } = config;

const MainContent = (): JSX.Element => {
    let r: RestaurantInterface[] = [];

    const [ fetchedRestaurants, setFetchedRestaurants ] = useState(r);
    const [ searchParam, setSearchParam ] = useState('');

    const fetchRestaurantsBySearchParam = (searchBy: string, searchValue: string, restaurants: any):void => {
        const specialCharNames:RestaurantInterface[] = restaurants.filter((r:RestaurantInterface) => {
            return ALPHABET.indexOf(r.name.substring(0, 1).toLowerCase()) === -1; 
        }).sort((a:RestaurantInterface, b:RestaurantInterface) => {
            if(a.name < b.name) {
                return -1;
            } else if(a.name > b.name) {
                return 1;
            }
            return 0;
        });

        const alphaCharNames:RestaurantInterface[] = restaurants.filter((r:RestaurantInterface) => {
            return ALPHABET.indexOf(r.name.substring(0, 1).toLowerCase()) !== -1; 
        }).sort((a:RestaurantInterface, b:RestaurantInterface) => {
            if(a.name < b.name) {
                return -1;
            } else if(a.name > b.name) {
                return 1;
            }
            return 0;
        });

        const sortedCharNames:RestaurantInterface[] = [...alphaCharNames, ...specialCharNames ];
        
        setSearchParam(`${searchBy} = "${searchValue}"`);
        setFetchedRestaurants(sortedCharNames);
    };


    return (
        <section className="MainContent">
            <BoroughSelector
                fetchRestaurantsByBorough={fetchRestaurantsBySearchParam}
            />
            <div className="divider">OR</div>
            <AttributeSelector/>
            <Pagination
                restaurantsList={fetchedRestaurants}
            />
        </section>
    )
};

export default MainContent;