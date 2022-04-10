import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuGuard } from '@services/guard.service';
import { ReportComponent } from './report.component';

const routes: Routes = [{ 
  path:'', 
  component:ReportComponent,
  data:{
    breadcrumb:'Dsa Report',
    code:'dsareport'
  },
  canActivate: [MenuGuard],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
