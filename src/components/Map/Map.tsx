import { useEffect, useState, useRef } from 'react';
import './Map.css';
import RestaurantInterface from '../../models/RestaurantInterface';
import { Loader } from '@googlemaps/js-api-loader';

interface MapPropsInterface {
    restaurantsList: RestaurantInterface[],
}

const Map = (props: MapPropsInterface):JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);
    const loader = new Loader(
        {
            apiKey: 'AIzaSyDsSzKbTxHePBhulyqZNaAlWMNbgoKeMd4',
        }
    );

    const mapOptions = {
        center: {
            lat: props.restaurantsList[Math.ceil(props.restaurantsList.length / 2)].latitude,
            lng: props.restaurantsList[Math.ceil(props.restaurantsList.length / 2)].longitude,
        },
        zoom: 12,
        mapTypeId: 'roadmap',
    };

    const drawMap = async () => {
        try {
            const google = await loader.load();
            const map = new google.maps.Map(document.getElementById('restaurants-map'), mapOptions);

            // Position markers for each restaurant
            for(let i = 0; i < props.restaurantsList.length; i++) {
                const r = props.restaurantsList[i];
                const infoLabel = new google.maps.InfoWindow(
                    {
                        content:
                        `<div className='info-label'>
                            <p>${r.name}</p>
                            <p><i>${r.cuisine}</i></p>
                            <p><i>${r.building} ${r.street} ${r.borough}, NY ${r.zipcode}</i></p>
                        </div>`,
                    }
                )
                const latLng = new google.maps.LatLng(props.restaurantsList[i].latitude, props.restaurantsList[i].longitude);
                const marker = new google.maps.Marker(
                    {
                        position: latLng,
                        map: map
                    }
                );
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
    }, [props.restaurantsList]);

    return (
        <section className='Map'>
            <div id='restaurants-map'>
                {props.restaurantsList.length < 1 && 'No restaurants found'}
            </div>
        </section>
    );
};

export default Map;