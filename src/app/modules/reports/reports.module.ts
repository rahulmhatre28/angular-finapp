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
import { SharedModule } from '@modules/shared/shared.module';
import {TabViewModule} from 'primeng/tabview';
import {FileUploadModule} from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import {DividerModule} from 'primeng/divider';
import { ReportsRoutingModule } from './reports-routing.module';
import { DisbursementComponent } from './disbursement/disbursement.component';

@NgModule({
  declarations: [
  
    DisbursementComponent
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
    SharedModule,
    ReportsRoutingModule,
    TabViewModule,
    FileUploadModule,
    InputNumberModule,
    InputMaskModule,
    CalendarModule,
    DividerModule
  ],
  exports: []

})
export class ReportsModule { }


