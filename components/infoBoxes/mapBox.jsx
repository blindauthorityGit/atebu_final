import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "250px",
};

const center = {
    lat: 47.71177,
    lng: 16.1807,
};

export default function GoogleMaps() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17} onUnmount={onUnmount}>
            {/* Child components, such as markers, info windows, etc. */}
            <Marker></Marker>
            <></>
        </GoogleMap>
    ) : (
        <></>
    );
}
