/**
 * Created by wang on 2017/5/12.
 */

import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { NotifyService } from './notify.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NotifyService
    ],
    exports: [
        NotifyService
    ]
})
export class Notify {
}