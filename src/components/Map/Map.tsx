import { useEffect } from 'react';
import './Map.css';
import RestaurantInterface from '../../models/RestaurantInterface';
import { DirectionsRequestInterface } from '../../models/DirectionsRequestInterface';
import { GoogleMapsLoaderService } from '../../services/googleMapsLoaderService';

interface MapPropsInterface {
    restaurantsList: RestaurantInterface[],
    clickHandler: Function,
    indicesList?: number[],
    request?: DirectionsRequestInterface,
    // googleService: any,
    // directionsService?: any,
    // directionsRenderer?: any,
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
            let directionsService;
            let directionsRenderer:any;

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

            if(props.request && props.request.origin.latitude !== 0 && props.request.origin.longitude !== 0) {
                directionsService = new google.maps.DirectionsService();
                directionsRenderer = new google.maps.DirectionsRenderer();
                directionsRenderer.setMap(map);
                const { request: { origin, destination, travelMode } } = props;
                const o = new google.maps.LatLng(origin.latitude, origin.longitude);
                const d = new google.maps.LatLng(destination.latitude, destination.longitude);

                directionsService.route({ origin: o, destination: d, travelMode }, (result:any, status:any) => {
                    console.log(status);
                    console.log(result);
                    if(status === 'OK') {
                        directionsRenderer.setDirections(result);
                    } else {
                        
                    }
                })
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