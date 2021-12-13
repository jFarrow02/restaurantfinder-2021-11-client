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
        zoom: 11,
        mapTypeId: 'roadmap',
    };

    const drawMap = async () => {
        try {
            const google = await loader.load();
            const map = new google.maps.Map(document.getElementById('restaurants-map'), mapOptions);

            // Position markers for each restaurant
            for(let i = 0; i < props.restaurantsList.length; i++) {
                const latLng = new google.maps.LatLng(props.restaurantsList[i].latitude, props.restaurantsList[i].longitude);
                console.log(latLng);
                new google.maps.Marker({position: latLng, map: map });
            }

        } catch(err:any) {
            console.log(err.message);
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