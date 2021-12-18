import { useState, useEffect } from 'react';
import './RestaurantsList.css';
import RestaurantInterface from '../../models/RestaurantInterface';
import { RestaurantCard, Map } from '../index';

interface RestaurantListProps {
    restaurantsList: RestaurantInterface[],
    currentStartIndex: number,
    currentEndIndex: number,
    currentRestaurantId: string,
    setCurrentRestaurantId: Function,
    setShowRestaurantDetails: Function,
};

const RestaurantsList = (props:RestaurantListProps):JSX.Element => {
    const initialIndices: number[] = [];

    const [ indicesList, setIndicesList ] = useState(initialIndices);
    const {
        restaurantsList,
        currentStartIndex,
        currentEndIndex,
        setShowRestaurantDetails,
        currentRestaurantId,
        setCurrentRestaurantId,
    } = props;

    useEffect(() => {
        const indices = [];
        for(let i = currentStartIndex; i < currentEndIndex + 1; i+= 1) {
            indices.push(i + 1);
        }
        setIndicesList(indices);
    }, [restaurantsList]);

    return (
        <section className="RestaurantsList">
            <div className='map'>
                <Map
                    restaurantsList={restaurantsList}
                    clickHandler={setCurrentRestaurantId}
                    indicesList={indicesList}
                />
            </div>
            <div className='restaurants'>
                {
                    restaurantsList.map((r, idx) => {
                        return (
                            <RestaurantCard
                                key={`restaurant-card-${idx}`}
                                restaurant={r}
                                currentRestaurantId={currentRestaurantId}
                                index={indicesList[idx]}
                                setCurrentRestaurantId={setCurrentRestaurantId}
                                setShowRestaurantDetails={setShowRestaurantDetails}
                            />
                        );
                    })
                }
            </div>
        </section>
    )
};

export default RestaurantsList;