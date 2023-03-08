import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Map } from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapboxMap = () => {
    const mapContainer = useRef(null);
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API;

    useEffect(() => {
        // Initialize map

        const map = new Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/light-v11",
            center: [16.1807, 47.711769],
            pitch: 45,
            zoom: 13.5,
            bearing: -17.6,
            antialias: true,
        });

        const marker = new mapboxgl.Marker({
            color: "#B2AC97",
        })
            .setLngLat([16.1807, 47.711769])
            .addTo(map);

        map.addControl(
            new mapboxgl.NavigationControl({
                visualizePitch: true,
                showZoom: true,
            })
        );

        map.addControl(
            new mapboxgl.NavigationControl({
                visualizePitch: true,
                showZoom: true,
            })
        );
    }, []);

    return <div className="map h-64" ref={mapContainer}></div>;
};

export default MapboxMap;
