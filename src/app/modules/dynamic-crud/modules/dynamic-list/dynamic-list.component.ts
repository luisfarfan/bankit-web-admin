import { Component, Input, OnInit } from '@angular/core';
import { DynamicCrud, DynamicListPaginate } from "../../interfaces/dynamic.interface";
import { DynamicService } from "../../dynamic.service";
import { HttpClient } from "@angular/common/http";
import { takeUntil } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";

@Component({
    selector: 'app-dynamic-list',
    templateUrl: './dynamic-list.component.html',
    styleUrls: ['./dynamic-list.component.scss']
})
export class DynamicListComponent implements OnInit {
    @Input() form: DynamicCrud;
    data: DynamicListPaginate<any>;
    private dynamicService: DynamicService<any>;
    unsubscribe = new Subject();
    initialized = false;

    constructor(private http: HttpClient, private route: ActivatedRoute) {
        this.dynamicService = new DynamicService<any>(http);
        this.route.data
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(data => {
                if ('form' in data) {
                    this.form = data.form;
                    this.init();
                }
            });
    }

    ngOnInit(): void {
        this.init();
    }

    private init() {
        if (this.form && !this.initialized) {
            this.dynamicService.setEndpoint(this.form.endpoint);
            this.getData();
            this.initialized = true;
        }
    }

    async getData(): Promise<void> {
        this.dynamicService.setEndpoint(this.form.endpoint);
        this.data = await this.dynamicService.list().toPromise();
        console.log(this.data);
    }

}
