import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from './dynamic-table.component';
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { DynamicSharedModule } from "../../shared/dynamic-shared.module";
import { FlexLayoutModule } from "@angular/flex-layout";


@NgModule({
    declarations: [DynamicTableComponent],
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        DynamicSharedModule,
        FlexLayoutModule
    ],
    exports: [
        DynamicTableComponent
    ],
})
export class DynamicTableModule {
}
