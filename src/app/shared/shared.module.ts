import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading.spinner/loading.spinner.component';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
    declarations: [
        DropdownDirective,
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceholderDirective
    ],
    imports:[
        CommonModule
    ],
    exports:[
        CommonModule,
        DropdownDirective,
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceholderDirective
    ],
    entryComponents:[
        AlertComponent
    ]
})
export class SharedModule { }