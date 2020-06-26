import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { UserForm } from "./user.form";
import { UserComponent } from './user.component';
import { DynamicFormModule } from "../dynamic-crud/modules/dynamic-form/dynamic-form.module";
import { DynamicListModule } from "../dynamic-crud/modules/dynamic-list/dynamic-list.module";
import { DynamicFormComponent } from "../dynamic-crud/modules/dynamic-form/dynamic-form.component";
import { DynamicListComponent } from "../dynamic-crud/modules/dynamic-list/dynamic-list.component";

const routes: Routes = [
    {
        path: '',
        component: DynamicFormComponent,
        data: {
            form: UserForm
        }
    },
    {
        path: 'list',
        component: DynamicListComponent,
        data: {
            form: UserForm
        }
    }
]

@NgModule({
    declarations: [UserComponent],
    imports: [
        CommonModule,
        DynamicFormModule,
        DynamicListModule,
        RouterModule.forChild(routes)
    ]
})
export class UserModule {
}
