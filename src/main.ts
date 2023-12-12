import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import  mapboxgl  from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoidGhlZmF0bG9wZWlybyIsImEiOiJjbHExbTNnYXMwYjVjMnZyeWlydXBubTJ5In0.5cI8ThTxF92e0EwZbAqCMA';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

defineCustomElements(window);