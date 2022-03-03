import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
const routes: Routes = [
  { 'path':'add', component:AddComponent,data:{
    breadcrumb:'Add Loan'
    } 
  },{ 'path':'edit/:id', component:AddComponent,data:{
    breadcrumb:'Edit Loan'
    } 
  },{ 'path':'application', component:ViewComponent,data:{
    breadcrumb:'Loan Applications',
    type:'application'
    } 
  },{ 'path':'assigned', component:ViewComponent,data:{
    breadcrumb:'Lender Assigned',
    type:'assigned'
    } 
  },{ 'path':'disbursed', component:ViewComponent,data:{
    breadcrumb:'Disbursed',
    type:'disbursed'
    } 
  },{ 'path':':channelid/add', component:AddComponent,data:{
    breadcrumb:'Add Loan'
    } 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule { }
