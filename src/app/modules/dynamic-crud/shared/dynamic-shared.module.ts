import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetInPipe } from "./pipes/get-in.pipe";


@NgModule({
    declarations: [GetInPipe],
    imports: [
        CommonModule
    ], exports: [GetInPipe]
})
export class DynamicSharedModule {
}
