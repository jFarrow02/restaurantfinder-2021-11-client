import { ReactElement, useState } from 'react';
import './MainContent.css';
import { BoroughSelector, AttributeSelector } from '..';

export default (): ReactElement => {

    const [ selectedBorough, setSelectedBorough] = useState('');
    const [ fetchedRestaurants, setFetchedRestaurants ] = useState(null);

    const fetchRestaurantsByBorough = (boroughName: string, restaurants: any) => {
        setSelectedBorough(boroughName);
        setFetchedRestaurants(restaurants);
    };

    return (
        <section className="MainContent">
            <div className="banner">Current Borough: {selectedBorough}</div>
            <BoroughSelector
                fetchRestaurantsByBorough={fetchRestaurantsByBorough}
            />
            <div className="divider">OR</div>
            <AttributeSelector/>
        </section>
    )
}