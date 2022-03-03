import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InhouseService } from '@services/inhouse.service';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers:[InhouseService]
})
export class ViewComponent implements OnInit {
  userList: any=[];
  totalRecords: number;
  cols: any[];
  loading: boolean;
  representatives: any;
  selectAll: boolean = false;
  selectedCustomers:any;
  buttons: any = [];

  constructor(private inhouseService:InhouseService,private router:Router) { }

  ngOnInit(): void {
    this.buttons=[{
      type:'button',class:'btn btn-info',label:'Add',icon:'fa fa-plus',disabled:false,action:'add'
    }];
  }

  buttonClick(event){
    switch(event){
      case 'add':this.router.navigate(['/Admin/inhouse/add']);
          break;
      default:return true;
    }
  }


  loadUser(event: LazyLoadEvent){
    this.loading = true;
    this.inhouseService.getAll({lazyEvent: JSON.stringify(event)}).subscribe((res)=>{
      if(res.status){
        this.userList=res.data.records;
        this.totalRecords = res.data.total;
        this.loading = false;
      }
      else {
        this.userList=[];
      }
    })
  }

  edit(item) {
    this.router.navigate(['/Admin/inhouse/edit/'+item.id]);
  }

  delete(item) {
    if(confirm("Do you want to delete this record?")===true) {
      let index = this.userList.findIndex((a)=>{
        return a.id==item.id;
      });
      if(index>-1) {
        this.loading = true;
        this.inhouseService.delete(item.id).subscribe((res)=>{
          if(res.status){
            this.userList.splice(index,1);
            this.loading = false;
          }
          else {
            this.userList=[];
          }
        })
      }
    }
  }
}
