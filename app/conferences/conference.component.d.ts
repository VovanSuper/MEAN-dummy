import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
export declare class ConferenceComponent implements OnInit {
    private actRoute;
    private router;
    conf: any;
    constructor(actRoute: ActivatedRoute, router: Router);
    ngOnInit(): void;
}
