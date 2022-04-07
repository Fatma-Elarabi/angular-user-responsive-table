import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {MultiSelectModule} from 'primeng/multiselect';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    MultiSelectModule
  ],
  exports: [
    TableModule,
    ButtonModule,
    MultiSelectModule
  ]
})
export class SharedModule { }
