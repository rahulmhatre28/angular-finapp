import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuGuard } from '@services/guard.service';
import { DailyComponent } from './daily/daily.component';
import { TestComponent } from './test/test.component';
import { YtdComponent } from './ytd/ytd.component';
const routes: Routes = [
  { 
    'path':'dsauser', 
    component:TestComponent,
    data:{
      breadcrumb:'Upload DSA Users',
      code:'dsa'
    },
    canActivate: [MenuGuard],
  },
  { 
    'path':'ytd', 
    component:YtdComponent,
    data:{
      breadcrumb:'Upload YTD File',
      code:'dsa'
    },
    canActivate: [MenuGuard],
  },
  { 
    'path':'current', 
    component:DailyComponent,
    data:{
      breadcrumb:'Upload Daily DSA File',
      code:'dsa'
    },
    canActivate: [MenuGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
