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
import { AddComponent } from './add/add.component';
import { SharedModule } from '@modules/shared/shared.module';
import { InhouseRoutingModule } from './inhouse-routing.module';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
      AddComponent,
      ViewComponent
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
    InhouseRoutingModule
  ],
  exports: []

})
export class InhouseModule { }


