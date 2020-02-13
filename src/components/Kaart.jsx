import React, { Component } from "react";
import mapboxgl from "mapbox-gl"

import TopBar from "./TopBar";
import styles from "./Kaart.module.css"

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

        return map;
    }

    render() {
        return (
            <>
                <TopBar title={this.props.challenge.naam} />
                <div ref={el => this.mapContainer = el} className={styles.mapContainer} />
            </>
        )
    }
}

export default Kaart;