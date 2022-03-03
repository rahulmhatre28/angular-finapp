import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { 'path':'add', component:AddComponent,data:{
    breadcrumb:'Add In-House'
    } 
  },{ 'path':'', component:ViewComponent,data:{
    breadcrumb:'In-House Users'
    } 
  },{ 'path':'edit/:id', component:AddComponent,data:{
    breadcrumb:'Edit In-House'
    } 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InhouseRoutingModule { }
