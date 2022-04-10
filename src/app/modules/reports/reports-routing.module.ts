import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuGuard } from '@services/guard.service';
import { DisbursementComponent } from './disbursement/disbursement.component';

const routes: Routes = [{ 
  'path':'disbursement', 
  component:DisbursementComponent,
  data:{
    breadcrumb:'Disbursement Report',
    code:'disburse'
  },
  canActivate: [MenuGuard],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
