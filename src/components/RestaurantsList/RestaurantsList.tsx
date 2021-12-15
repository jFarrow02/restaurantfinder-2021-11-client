import { useState, useEffect } from 'react';
import './RestaurantsList.css';
import RestaurantInterface from '../../models/RestaurantInterface';
import { RestaurantCard, Map } from '../index';
// import { useAppSelector } from '../../store/hooks';

interface RestaurantListProps {
    restaurantsList: RestaurantInterface[],
    currentStartIndex: number,
    currentEndIndex: number,
};

const RestaurantsList = (props:RestaurantListProps):JSX.Element => {
    const initialIndices: number[] = [];
    const initialRestaurants: RestaurantInterface[] = [];

    const [ currentRestaurantId, setCurrentRestaurantId ] = useState('');
    const [ indicesList, setIndicesList ] = useState(initialIndices);
    const {
        restaurantsList,
        currentStartIndex,
        currentEndIndex,
    } = props;

    // const fullList = useAppSelector((state) => state.restaurantList.fullList);
    
    useEffect(() => {
        const indices = [];
        for(let i = currentStartIndex; i < currentEndIndex + 1; i+= 1) {
            indices.push(i + 1);
        }
        setIndicesList(indices);
    }, [restaurantsList]);

    return(
        <section className="RestaurantsList">
            <div className='map'>
                <Map
                    restaurantsList={restaurantsList}
                    setCurrentRestaurantId={setCurrentRestaurantId}
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
                            />
                        );
                    })
                }
            </div>
        </section>
    );
};

export default RestaurantsList;