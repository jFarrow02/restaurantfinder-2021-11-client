const BOROUGHS: { [key: string]: any} = {
    BROOKLYN: { displayName: 'Brooklyn', shortName: 'BKYLN' },
    BRONX: { displayName: 'Bronx', shortName: 'BRONX' },
    QUEENS: { displayName: 'Queens', shortName: 'QUEENS'},
    MANHATTAN: { displayName: 'Manhattan', shortName: 'MNHTN'},
    STATEN_ISLAND: { displayName: 'Staten Island', shortName: 'STNIL'},
}

const HTTP_METHODS: { [key: string]: string } = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
};

const HEADERS_DEFAULT: { [key: string]: string } = {
    'Content-Type': 'application/json',
    'User-Agent': '',
    'Accept': '*/*',
    'Accept-Encoding': '',
    'Connection': 'keep-alive',
};

export default {
    API_URL: 'http://localhost:8093/restaurantfinder',
    HEADERS_DEFAULT,
    HTTP_METHODS,
    BOROUGHS,
}