import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { TestComponent } from './test/test.component';
import { YtdComponent } from './ytd/ytd.component';
import { DailyComponent } from './daily/daily.component';
import { SharedModule } from '@modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TestComponent,
    YtdComponent,
    DailyComponent
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UploadModule { }
