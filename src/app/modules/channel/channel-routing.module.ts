import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { 'path':'add', component:AddComponent,data:{
    breadcrumb:'Add Channel'
    } 
  },{ 'path':'', component:ViewComponent,data:{
    breadcrumb:'Channel Users'
    } 
  },{ 'path':'edit/:id', component:AddComponent,data:{
    breadcrumb:'Edit Channel'
    } 
  },{ 'path':'profile', component:AddComponent,data:{
    breadcrumb:'Profile',
    pagetype:'profile'
    } 
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChannelRoutingModule { }
