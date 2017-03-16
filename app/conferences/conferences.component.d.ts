import { OnInit } from '@angular/core';
import { ApiService } from '../shared';
export declare class ConferencesComponent implements OnInit {
    apiService: ApiService;
    conferences: any;
    constructor(apiService: ApiService);
    ngOnInit(): void;
}
