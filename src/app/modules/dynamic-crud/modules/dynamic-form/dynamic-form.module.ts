import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormlyModule } from "@ngx-formly/core";
import { MatButtonModule } from "@angular/material/button";


@NgModule({
    declarations: [DynamicFormComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormlyModule,
        MatButtonModule
    ],
    exports: [DynamicFormComponent]
})
export class DynamicFormModule {
}
