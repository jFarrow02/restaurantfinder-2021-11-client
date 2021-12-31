export interface LatLngInterface {
    latitude: number,
    longitude: number,
}

export interface DirectionsRequestInterface {
    origin: LatLngInterface,
    destination: LatLngInterface,
    travelMode: string,
}