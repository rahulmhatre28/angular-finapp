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
      breadcrumb:'Add Channel',
      code:'a_channel'
    },
    canActivate: [MenuGuard], 
  },
  { 
    'path':'', 
    component:ViewComponent,
    data:{
      breadcrumb:'Channel Users',
      code:'v_channel'
    },
    canActivate: [MenuGuard] 
  },
  { 
    'path':'edit/:id', 
    component:AddComponent,
    data:{
      breadcrumb:'Edit Channel',
      code:'a_channel'
    },
    canActivate: [MenuGuard]
  },
  { 
    'path':'profile', 
    component:AddComponent,
    data:{
      breadcrumb:'Profile',
      pagetype:'profile',
      code:'v_profile'
    },
    canActivate: [MenuGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChannelRoutingModule { }
