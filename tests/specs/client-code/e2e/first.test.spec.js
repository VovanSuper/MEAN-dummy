// import 'core-js/es6';
// import 'core-js/es7/reflect';
// import 'zone.js/dist/zone';


// import 'zone.js/dist/zone-node';
// import 'zone.js/dist/long-stack-trace-zone';
// import 'zone.js/dist/proxy';
// import 'zone.js/dist/sync-test';
// import 'zone.js/dist/async-test';
// import 'zone.js/dist/fake-async-test';
// import 'zone.js/dist/mocha-patch';

// import 'mocha';
// import { fakeServer } from 'sinon';
// import { JSDOM } from 'jsdom';
// import { expect } from 'chai';

// import path from 'path';
// import { Http, HttpModule, BaseRequestOptions } from '@angular/http';
// import { TestBed, inject, getTestBed } from "@angular/core/testing";
// import { MockBackend } from "@angular/http/testing";
// import {
//   BrowserDynamicTestingModule,
//   platformBrowserDynamicTesting
// } from '@angular/platform-browser-dynamic/testing';

// import { ApiService } from '../../../../client/app/shared';

// const window = new JSDOM('<!doctype html><html><body></body></html>').window;

// const document = window.document;

// // @ts-ignore
// global.window = window;
// // @ts-ignore
// global.document = document;
// // global.HTMLElement = window.HTMLElement;
// // global.XMLHttpRequest = window.XMLHttpRequest;
// // global.Node = window.Node;

// describe('SharedService', () => {
//   let service;
//   let server;

//   beforeEach(() => {
//     TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
//     server = fakeServer.create();
//     server.autoRespond = true;
//     server.respondWith('GET', 'http://localhost:8080/events/all', [200, { "Content-Type": "application/json" },
//       `[
//         { "_id": "594781604b301713f0952b86", "name": "First Event",
//         "startTime": "1497858400213", "endTime": "1497858400213", "users": [] },
//         { "_id": "594781604b301713f0952b87", "name": "Second Event",
//         "startTime": "1497858400213", "endTime": "1497858400213", "users": [] }
//       ]`
//     ]);

//     afterEach(() => {
//       server.restore();
//       getTestBed().resetTestingModule();
//     });

//     TestBed.configureTestingModule({
//       imports: [HttpModule],
//       declarations: [ApiService],
//       providers: [
//         MockBackend,
//         BaseRequestOptions,
//         {
//           provide: Http,
//           deps: [MockBackend, BaseRequestOptions],
//           useFactory: (backend, options) => {
//             return new Http(backend, options);
//           }
//         },
//         {
//           provide: ApiService,
//           deps: [Http],
//           useFactory: (http) => new ApiService(http)
//         }
//       ]
//     });
//   });

//   it('should be an object', inject([ApiService], (service) => {
//     expect(service).to.be.an('object');
//     console.dir(service);
//   }));
  
// });
