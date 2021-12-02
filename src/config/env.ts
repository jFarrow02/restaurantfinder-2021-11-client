export default {
    API_URL: 'http://localhost:8093/restaurantfinder',
    HEADERS_DEFAULT: {
        'Content-Type': 'application/json',
        'User-Agent': '',
        'Accept': '*/*',
        'Accept-Encoding': '',
        'Connection': 'keep-alive',
    },
    HTTP_METHODS: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        PATCH: 'PATCH',
        DELETE: 'DELETE',
    },
    BOROUGHS: {
        BROOKLYN: { displayName: 'Brooklyn', shortName: 'BKYLN' },
        BRONX: { displayName: 'Bronx', shortName: 'BRONX' },
        QUEENS: { displayName: 'Queens', shortName: 'QUEENS'},
        MANHATTAN: { displayName: 'Manhattan', shortName: 'MNHTN'},
        STATEN_ISLAND: { displayName: 'Staten Island', shortName: 'STNIL'},
    }
}