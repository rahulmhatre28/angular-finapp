import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MomsComponent } from './moms/moms.component';

const routes: Routes = [
  { 'path':'moms', component:MomsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
