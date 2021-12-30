import { Loader } from '@googlemaps/js-api-loader';

export const GoogleMapsLoaderService = {
    async getLoader() {
        const loader = new Loader(
            {
                apiKey: 'AIzaSyDsSzKbTxHePBhulyqZNaAlWMNbgoKeMd4',
            }
        );
        try {
            const google = await loader.load();
            return google;
        } catch(err) {
            throw err;
        }
    }
};

export default GoogleMapsLoaderService;