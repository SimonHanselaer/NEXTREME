import React, { Component } from "react";
import mapboxgl from "mapbox-gl"

mapboxgl.accessToken = 'pk.eyJ1Ijoic2ltb25oYW5zZWxhZXIiLCJhIjoiY2s2MjU3NXNnMDltODNkbzAwMHlpYWZxYyJ9.8oa3FQ3hnqiA9qmPCPMrjg';

class Kaart extends Component {
    constructor(props){
        super(props);
        this.state = {
            lat: props.challenge.lat,
            lng: props.challenge.lng,
            zoom: 16
        }
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
            });
    }

    render() {
        return (
            <>
                <h1>{this.props.challenge.naam}</h1>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
            </>
        )
    }
}

// const Kaart = (props) => {
//     const challenge = props.challenge;

//     const mapProps = {
//         lng: 5,
//         lat: 34,
//         zoom: 2
//     }

//     let mapContainer;

//     useEffect(() => {
//         new mapboxgl.Map({
//             container: this.mapContainer,
//             style: 'mapbox://styles/mapbox/streets-v11',
//             center: [mapProps.lng, mapProps.lat],
//             zoom: mapProps.zoom
//             });
//     },[mapContainer, mapProps])

//     return (
//         <>
//             <h1>{challenge.naam}</h1>
//             <div ref={el => this.mapContainer = el} className="mapContainer"></div>
//         </>
//     );
// }

export default Kaart;