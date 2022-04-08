import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {MultiSelectModule} from 'primeng/multiselect';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    MultiSelectModule,
    ToastModule
  ],
  exports: [
    TableModule,
    ButtonModule,
    MultiSelectModule,
    ToastModule
  ]
})
export class SharedModule { }
