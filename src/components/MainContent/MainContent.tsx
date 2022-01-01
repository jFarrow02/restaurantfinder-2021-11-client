import { useState } from 'react';
import './MainContent.css';
import { BoroughSelector, AttributeSelector, Pagination, RestaurantDetails } from '..';
import RestaurantInterface from '../../models/RestaurantInterface';
import ReviewsInterface from '../../models/ReviewInterface';
import config from '../../config/env';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

const { ALPHABET } = config;

const MainContent = (): JSX.Element => {
    let r: RestaurantInterface[] = [];
    let initReviews: ReviewsInterface[] = [];

    const [ fetchedRestaurants, setFetchedRestaurants ] = useState(r);
    const [ searchParam, setSearchParam ] = useState('');
    const [ currentRestaurantReviews, setCurrentRestaurantReviews ] = useState(initReviews);

    const fetchRestaurantsBySearchParam = (searchBy: string, searchValue: string, restaurants: any):void => {
        window.localStorage.removeItem('fetchedRestaurantsBySearchParam');
        window.localStorage.removeItem('currentPage');
        window.localStorage.removeItem('currentPageNumber');
        
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
        window.localStorage.setItem('fetchedRestaurantsBySearchParam', JSON.stringify(sortedCharNames));
    };


    const selectorGroup = (
        <>
            <BoroughSelector
                fetchRestaurantsByBorough={fetchRestaurantsBySearchParam}
                unsetCurentRestaurantReviews={setCurrentRestaurantReviews}
            />
            <div className="divider">OR</div>
            <AttributeSelector
                fetchRestaurantsBySearchParam={fetchRestaurantsBySearchParam}
                unsetCurentRestaurantReviews={setCurrentRestaurantReviews}
            />
        </>
    );

    return (
        <BrowserRouter>
            <section className="MainContent">
            <Link to='/'>Home</Link>
            <Link to='/restaurants'>Restaurants</Link>
                <Routes>
                    <Route path='/' element={selectorGroup}/>
                    <Route path='restaurants' element={<Pagination unsetCurentRestaurantReviews={setCurrentRestaurantReviews}/>}/>
                    <Route path='restaurants/:id' element={<RestaurantDetails setRestaurantReviews={setCurrentRestaurantReviews} reviews={currentRestaurantReviews}/>}/>
                </Routes>
                <Outlet/>
            </section>
        </BrowserRouter>
        
    )
};

export default MainContent;