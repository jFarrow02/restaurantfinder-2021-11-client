import { Loader } from '@googlemaps/js-api-loader';

const API_KEY = 'AIzaSyDsSzKbTxHePBhulyqZNaAlWMNbgoKeMd4';

export const GoogleMapsLoaderService = {
    async getLoader() {
        const loader = new Loader(
            {
                apiKey: API_KEY,
            }
        );
        try {
            const google = await loader.load();
            return google;
        } catch(err) {
            throw err;
        }
    },

    async getMapServices() {
        const loader = new Loader({ apiKey: API_KEY });
        try {
            const google = await loader.load();
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer();
            return {
                google,
                directionsService,
                directionsRenderer,
            }
        } catch(err) {
            throw err;
        }
    }
};

export default GoogleMapsLoaderService;