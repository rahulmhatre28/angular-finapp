import {
  Component,
  OnInit,
  Renderer2,
  OnDestroy,
  HostBinding
} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from "@services/auth.service";
import {ErrorService} from "@services/error.service";
import {GlobalService} from "@services/global.service";
import {Router} from "@angular/router";
import { RoleService } from '@services/role.service';
import { UserService } from '@services/user.service';
import { LazyLoadEvent } from 'primeng/api';
import { BankService } from '@services/bank.service';
import { LocationService } from '@services/location.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers:[RoleService,UserService, BankService, LocationService]
})
export class UsersComponent implements OnInit, OnDestroy {

  public registerForm: FormGroup;
  display: boolean;
  roleList: any=[];
  userList: any=[];
  selectedId: number=0;
  buttons:any=[];
  totalRecords: any=0;
  loading: boolean;
  representatives: any;
  selectAll: boolean = false;
  selectedCustomers:any;
  bankList: any;
  stateList: any;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private errorHandler: ErrorService,
    private globalService: GlobalService,
    private router: Router,
    private authService:AuthService,
    private roleService:RoleService,
    private userService:UserService,
    private bankService:BankService,
    private locationService:LocationService
  ) {
  }

  ngOnInit() {
    this.buttons=[{
      type:'button',class:'btn btn-info',label:'Add',icon:'fa fa-plus',disabled:false,action:'add',access:'add'
    }];
    this.registerForm = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required]),
      confirm_password: new FormControl(null, [Validators.required]),
      role_id: new FormControl(null, [Validators.required]),    
      parent_id: new FormControl(0),
      bank_id: new FormControl(null),
      state_id: new FormControl(null),
      branch: new FormControl(null),
    });
    this.loadRoles();
    this.loadBanks();
    this.loadLocation();
  }

  onSelectRole() {
    if(this.registerForm.controls['role_id'].value==7){
      this.addValidators(['bank_id','state_id','branch']);
      this.removeValidators(['parent_id']);
    } 
    else if(this.registerForm.controls['role_id'].value==1 || this.registerForm.controls['role_id'].value==2) {
      this.removeValidators(['bank_id','state_id','branch','parent_id']);
    } 
    else {
      this.removeValidators(['bank_id','state_id','branch']);
      this.addValidators(['parent_id']);
    }
  }

  addValidators(controls : string[]){
    controls.forEach(c => {
        this.registerForm.get(c)?.setValidators(Validators.required);
        this.registerForm.get(c)?.updateValueAndValidity();
    });
}

removeValidators(controls : string[]){
    controls.forEach(c => {
        this.registerForm.get(c)?.setValidators(null);
        this.registerForm.get(c)?.updateValueAndValidity();
    });
}

  buttonClick(event){
    switch(event){
      case 'add':this.add();
          break;
      default:return true;
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  async registerUser() {
    if (this.registerForm.valid) {
      this.userService.upsert({...this.registerForm.value},this.selectedId).subscribe((result: any) => {
        if (result.status) {
          if (result.message) {
            this.display=false;
            this.toastr.success(result.message);
            this.loadUser({"first":0,"rows":10,"sortOrder":1,"filters":{},"globalFilter":null});
            this.selectedId=0;
          }
        } else {
          this.errorHandler.basicHandler(result);
        }
      }, (result: any) => {
        this.errorHandler.criticalHandler(result);
      });
    } else {
      this.toastr.error('Some fields are ');
    }
  }

  async loadRoles() {
    await this.roleService.getAll().subscribe((res)=>{
      if(res.resultKey==1){
        // this.roleList=res.resultValue.filter((a)=>{
        //   return a.id!=9;
        // });
        this.roleList = res.resultValue;
      }
      else {
        this.roleList=[];
      }
    })
  }

  add() {
    this.display=true; 
    this.clear(); 
  }

  ngOnDestroy() {
    
  }

  loadUser(event: LazyLoadEvent){
    this.loading = true;
    this.userService.getAll({lazyEvent: JSON.stringify(event)}).subscribe((res)=>{
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

  edit(item){
    this.clear();
    this.display=true;
    this.userService.getDetailById({
      id:item.id
    }).subscribe((res)=>{
      if(res.status) {
        this.registerForm.controls['first_name'].setValue(res.data.first_name);
        this.registerForm.controls['last_name'].setValue(res.data.last_name);
        this.registerForm.controls['email'].setValue(res.data.email);
        this.registerForm.controls['phone'].setValue(res.data.phone);
        this.registerForm.controls['role_id'].setValue(res.data.role_id);
        this.registerForm.controls['parent_id'].setValue(res.data.parent_id);
        this.registerForm.controls['bank_id'].setValue(res.data.bank_id);
        this.registerForm.controls['state_id'].setValue(res.data.state_id);
        this.registerForm.controls['branch'].setValue(res.data.branch);
        this.registerForm.controls['password'].setValue('@@@@@@@@');
        this.registerForm.controls['confirm_password'].setValue('@@@@@@@@');
        this.selectedId = res.data.id;
      }
    })
  }

  clear(){
    this.registerForm.reset();
    this.selectedId  = 0;
  }

  delete(item) {
    if(confirm("Do you want to delete this record?")===true) {
      let index = this.userList.findIndex((a)=>{
        return a.id==item.id;
      });
      if(index>-1) {
        this.loading = true;
        // this.channelService.delete(item.id).subscribe((res)=>{
        //   if(res.status){
        //     this.userList.splice(index,1);
        //     this.loading = false;
        //   }
        //   else {
        //     this.userList=[];
        //   }
        // })
      }
    }
  }

  loadBanks() {
    this.bankService.list().subscribe((res)=>{
      if(res.status){
        this.bankList=res.data;
      }
      else {
        this.bankList=[];
      }
    })
  }

  loadLocation() {
    this.locationService.getByParams({
      type:'state',
      id:101
    }).subscribe((res)=>{
      if(res.status){
        let data = res.data;
        this.stateList = data;
      }
      else {
        this.stateList=[];
      }
    })
  }


}
