import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicListComponent } from './dynamic-list.component';
import { DynamicTableModule } from "../dynamic-table/dynamic-table.module";

@NgModule({
    declarations: [DynamicListComponent],
    imports: [
        CommonModule,
        DynamicTableModule
    ],
    exports: [DynamicListComponent]
})
export class DynamicListModule {
}
