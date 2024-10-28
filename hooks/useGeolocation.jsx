import React, { useState } from 'react'

export default function useGeolocation() {

    const [geolocation, setGeolocation] = useState(null)

    function success(position) {
        setGeolocation({ lat: position.coords.latitude, lon: position.coords.longitude })

    }

    function error() {
        console.log("")
    }

    const options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 2700
    }
    function getGeo() {
        navigator.geolocation.watchPosition(success, error, options)
    }
    return {
        geolocation,
        getGeo
    }
}
