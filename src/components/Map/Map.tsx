import { useEffect } from 'react';
import './Map.css';
import RestaurantInterface from '../../models/RestaurantInterface';
import { GoogleMapsLoaderService } from '../../services';

interface MapPropsInterface {
    restaurantsList: RestaurantInterface[],
    clickHandler: Function,
    indicesList?: number[],
}

const Map = (props: MapPropsInterface):JSX.Element => {
    const {
        restaurantsList,
        clickHandler,
        indicesList,
    } = props;

    const mapOptions = {
        center: {
            lat: props.restaurantsList[Math.floor(restaurantsList.length / 2)].latitude,
            lng: props.restaurantsList[Math.floor(restaurantsList.length / 2)].longitude,
        },
        zoom: 12,
        mapTypeId: 'roadmap',
    };

    const drawMap = async () => {
        try {
            const google = await GoogleMapsLoaderService.getLoader();
            const map = new google.maps.Map(document.getElementById('restaurants-map'), mapOptions);

            // Position markers for each restaurant
            for(let i = 0; i < restaurantsList.length; i++) {
                const r = restaurantsList[i];
                const infoLabel = new google.maps.InfoWindow(
                    {
                        content: indicesList ? 
                        `<div className='info-label'>
                            <p>${indicesList[i]}: ${r.name}</p>
                            <p><i>${r.cuisine}</i></p>
                            <p><i>${r.building} ${r.street} ${r.borough}, NY ${r.zipcode}</i></p>
                        </div>` : 
                        `<div className='info-label>
                            <p>${r.name}</p>
                            <p><i>${r.cuisine}</i></p>
                            <p><i>${r.building} ${r.street} ${r.borough}, NY ${r.zipcode}</i></p>
                        </div>'`,
                    }
                )
                const latLng = new google.maps.LatLng(restaurantsList[i].latitude, restaurantsList[i].longitude);
                const marker = new google.maps.Marker(
                    {
                        position: latLng,
                        map: map
                    }
                );
                marker.addListener('click', () => {
                    clickHandler(r.restaurantId);
                });

                marker.addListener('mouseover', () => {
                    infoLabel.open({
                        anchor: marker,
                        map,
                        shouldFocus: false,
                    });
                });
                marker.addListener('mouseout', () => {
                    const timeout = setTimeout(() => {
                        infoLabel.close();
                        clearTimeout(timeout);
                    }, 250);
                });
            }

        } catch(err:any) {
            throw err;
        }
    };

    useEffect(() => {
        drawMap();
    }, [restaurantsList, indicesList]);

    return (
        <section className='Map'>
            <div id='restaurants-map'>
                {restaurantsList.length < 1 && 'No restaurants found'}
            </div>
        </section>
    );
};

export default Map;