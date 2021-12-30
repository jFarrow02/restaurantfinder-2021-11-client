export interface LatLngInterface {
    latitude: number,
    longitude: number,
}

export interface DirectionsRequestInterface {
    origin: LatLngInterface | string,
    destination: LatLngInterface | string,
    travelMode: string,
}