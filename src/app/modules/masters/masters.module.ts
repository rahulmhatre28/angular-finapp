import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';
import { MomsComponent } from './moms/moms.component';
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


@NgModule({
  declarations: [
    MomsComponent
  ],
  imports: [
    CommonModule,
    MastersRoutingModule,
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
    FocusTrapModule
  ]
})
export class MastersModule { }
