import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuGuard } from '@services/guard.service';
import { ViewComponent } from './view/view.component';

const routes: Routes = [{ 
  'path':'', 
  component:ViewComponent,
  data:{
    breadcrumb:'View Payments',
    code:'v_payment'
  },
  canActivate: [MenuGuard], 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
