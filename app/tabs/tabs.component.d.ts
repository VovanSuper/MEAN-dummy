import { OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { ApiService } from '../shared';
export declare class TabularComponent implements AfterContentInit, OnInit, OnDestroy {
    private apiService;
    tabs: any[];
    constructor(apiService: ApiService);
    ngAfterContentInit(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
