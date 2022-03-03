import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {ListboxModule} from 'primeng/listbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from "primeng/tooltip";
import {FocusTrapModule} from 'primeng/focustrap';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterModule, Routes } from '@angular/router';
import {ChartModule} from 'primeng/chart';
import {CheckboxModule} from 'primeng/checkbox';

@NgModule({
  declarations: [
      BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    ListboxModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    MultiSelectModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    TooltipModule,
    InputTextModule,
    TooltipModule,
    InputSwitchModule,
    FocusTrapModule,
    RouterModule,
    ChartModule,
    CheckboxModule
  ],
  exports: [BreadcrumbComponent]

})
export class SharedModule { }


