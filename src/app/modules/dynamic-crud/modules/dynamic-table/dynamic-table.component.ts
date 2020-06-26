import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DynamicCrud, DynamicField, DynamicListPaginate } from "../../interfaces/dynamic.interface";
import { Subject } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";

@Component({
    selector: 'app-dynamic-table',
    templateUrl: './dynamic-table.component.html',
    styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {
    @Input() form: DynamicCrud;
    @Input() fields: DynamicField[];

    @Input() data: DynamicListPaginate<any>;

    @Input() selectable = false;

    @Input() selectableUnique = false;

    @Output() edit: EventEmitter<any> = new EventEmitter<any>();

    @Output() delete: EventEmitter<any> = new EventEmitter<any>();

    @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

    @Input() showEdit = true;
    @Input() showDelete = true;
    @Input() showCancel = false;
    @Input() count = 10;
    PAGE_START = 0;
    PAGE_SIZE = 10;
    currentPageNumber = this.PAGE_START;
    currentPageSize = this.PAGE_SIZE;

    displayedColumns: string[] = [];

    unsubscribe = new Subject();

    @Input() downloadKeyName: string;

    @Output() itemsSelected: EventEmitter<number[] | any> = new EventEmitter<number[] | any>();

    @Output() pageEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Output() selectedUniqueValue = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        this.buildDataTable();
    }

    ngAfterViewInit(): void {
    }

    private buildDataTable(): void {
        this.displayedColumns = [];
        this.fields
            .forEach(f => {
                if (f.fields) {
                    this.displayedColumns.push(...f.fields.filter(f => f.showInTable).map(fc => fc.access_value));
                } else {
                    this.displayedColumns.push(f.access_value);
                }
            });

        this.displayedColumns.push(...['buttons']);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    pageChanged($event: PageEvent) {
        this.currentPageNumber = $event.pageIndex;
        this.currentPageSize = $event.pageSize;
        this.pageEvent.emit($event);
    }

}
