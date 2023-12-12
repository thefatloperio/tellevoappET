import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: mapboxgl.Map;
  locationInput1: string;
  locationInput2: string;

  constructor() {}

  ngOnInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoidGhlZmF0bG9wZWlybyIsImEiOiJjbHExbTNnYXMwYjVjMnZyeWlydXBubTJ5In0.5cI8ThTxF92e0EwZbAqCMA';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-70.61492586056333, -33.43292529147614],
      zoom: 9,
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  searchLocation() {
    // Use Mapbox Geocoding API to search for locations
    this.geocodeLocation(this.locationInput1).then(coord1 => {
      this.geocodeLocation(this.locationInput2).then(coord2 => {
        // Draw a line between the two locations
        this.drawRoute(coord1, coord2);
      });
    });
  }

  geocodeLocation(locationInput: string): Promise<number[]> {
    return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${locationInput}.json?access_token=${mapboxgl.accessToken}`)
      .then(response => response.json())
      .then(data => data.features[0].geometry.coordinates)
      .catch(error => {
        console.error('Error fetching location:', error);
        return [];
      });
  }

  drawRoute(coord1: number[], coord2: number[]) {
    // Add a GeoJSON source with a line
    this.map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [coord1, coord2],
        },
      },
    });

    // Add a line layer to the map
    this.map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#888',
        'line-width': 8,
      },
    });
  }
}
