import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuGuard } from '@services/guard.service';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
const routes: Routes = [
  { 
    'path':'add', 
    component:AddComponent,
    data:{
      breadcrumb:'Add Loan',
      code:'a_loan'
    },
    canActivate: [MenuGuard],
  },
  { 
    'path':'edit/:id', 
    component:AddComponent,
    data:{
      breadcrumb:'Edit Loan',
      code:'a_loan'
    },
    canActivate: [MenuGuard],
  },
  { 
    'path':'application', 
    component:ViewComponent,
    data:{
      breadcrumb:'Loan Applications',
      type:'application',
      code:'loan_app'
    },
    canActivate: [MenuGuard], 
  },
  { 
    'path':'assigned', 
    component:ViewComponent,
    data:{
      breadcrumb:'Lender Assigned',
      type:'assigned',
      code:'loan_ass'
    },
    canActivate: [MenuGuard],
  },
  { 
    'path':'disbursed', 
    component:ViewComponent,
    data:{
      breadcrumb:'Disbursed',
      type:'disbursed',
      code:'loan_dis'
    },
    canActivate: [MenuGuard], 
  },
  { 
    'path':':channelid/add', 
    component:AddComponent,
    data:{
      breadcrumb:'Add Loan',
      code:'a_loan'
    },
    canActivate: [MenuGuard],
  },
  { 
    'path':'view/:viewid', 
    component:AddComponent,
    data:{
      breadcrumb:'Edit Loan',
      code:'a_loan'
    },
    canActivate: [MenuGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule { }
