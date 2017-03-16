import './polyfills';

// import 'core-js';
// import 'reflect-metadata';
// import 'zone.js/dist/zone';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule).then( (mref) => {
    console.dir(mref);
});