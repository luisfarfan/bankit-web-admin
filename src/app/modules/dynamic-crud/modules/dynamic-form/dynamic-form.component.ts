import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DynamicService } from "../../dynamic.service";
import { HttpClient } from "@angular/common/http";
import { DynamicCrud } from "../../interfaces/dynamic.interface";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { DynamicUtils } from "../../utils/dynamic.utils";
import to from "await-to-js";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnDestroy {
    protected dynamicService: DynamicService<any>;

    @Input() form: DynamicCrud;
    @Input() id: number;

    dynamicForm: FormGroup = new FormGroup({});
    model: any = {};
    options: FormlyFormOptions = {};
    fields: FormlyFieldConfig[];

    @Output() save: EventEmitter<any> = new EventEmitter<any>();
    @Output() postSave: EventEmitter<any> = new EventEmitter<any>();
    @Output() postSaveError: EventEmitter<any> = new EventEmitter<any>();

    unsubscribe = new Subject();

    constructor(private http: HttpClient, private route: ActivatedRoute) {
        this.dynamicService = new DynamicService<any>(http);
        this.route.data
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(data => {
                if ('form' in data) {
                    this.form = data.form;
                }
            });
    }

    ngOnInit(): void {
        this.fields = DynamicUtils.jsonFormToFormlyField(this.form);
        this.dynamicService.setEndpoint(this.form.endpoint);
        this.getData();
    }

    async submit(): Promise<void> {
        if (this.id) {
            const [error, response] = await to(this.dynamicService.put(this.id, this.dynamicForm.getRawValue()).toPromise());
            this._submit({error, response});
            return;
        } else {
            const [error, response] = await to(this.dynamicService.add(this.dynamicForm.getRawValue()).toPromise());
            this._submit({error, response});
        }
    }

    private _submit({error, response}): void {
        if (!response) {
            this.postSaveError.emit(error);
        } else {
            this.postSave.emit(response);
        }
    }

    async getData() {
        if (this.id) {
            this.model = await this.dynamicService.get(this.id).toPromise();
        }
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
