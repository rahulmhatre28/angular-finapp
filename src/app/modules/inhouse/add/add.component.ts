import {
  Component,
  OnInit,
  Renderer2,
  OnDestroy,
  HostBinding
} from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from "@services/auth.service";
import {ErrorService} from "@services/error.service";
import {GlobalService} from "@services/global.service";
import {ActivatedRoute, Router} from "@angular/router";
import { RoleService } from '@services/role.service';
import { InhouseService } from '@services/inhouse.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers:[RoleService,InhouseService]
})
export class AddComponent implements OnInit, OnDestroy {

  public registerForm: FormGroup;
  display: boolean;
  roleList: any=[];
  userList: any=[];
  selectedId: number=0;
  buttons:any=[];

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private errorHandler: ErrorService,
    private globalService: GlobalService,
    private router: Router,
    private authService:AuthService,
    private roleService:RoleService,
    private inhouseService:InhouseService,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.buttons=[{
      type:'button',class:'btn btn-danger',label:'Back',icon:'fa fa-back',disabled:false,action:'back',hidden:true
    },{
      type:'button',class:'btn btn-danger',label:'Reset',icon:'fa fa-reload',disabled:false,action:'reset',hidden:false
    },{
      type:'button',class:'btn btn-info',label:'Save',icon:'fa fa-save',disabled:false,action:'save',hidden:false
    }];
    this.registerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      pan: new FormControl(null, [Validators.required]),
      pincode: new FormControl(null, [Validators.required]),
      gst: new FormControl(null, [Validators.required]),
      banks: new FormArray([])
    });

    if (this.route.snapshot.paramMap.has('id')) {
      let id: any = this.route.snapshot.paramMap.get('id');
      this.buttons[0].hidden = false;
      this.buttons[1].hidden = true;
      this.edit(id);
    }
    else  {
      this.addBank();
    }
  }

  buttonClick(event){
    switch(event){
      case 'reset':this.clear();
          break;
      case 'save':this.registerUser();
          break;
      case 'back':this.router.navigate(['/Admin/inhouse/']);
          break;
      default:return true;
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  get t() { return this.f.banks as FormArray; }
  get bankFormGroups() { return this.t.controls as FormGroup[]; }

  addBank() {
    this.t.push(this.formBuilder.group({
      bank: new FormControl(null, [Validators.required]),    
      branchname: new FormControl(null, [Validators.required]),    
      accountno: new FormControl(null, [Validators.required]),    
      accounttype: new FormControl(null, [Validators.required]),    
      ifsccode: new FormControl(null, [Validators.required])
    }));
  }

  async registerUser() {
    if (this.registerForm.valid) {
      this.inhouseService.upsert({...this.registerForm.value},this.selectedId).subscribe((result: any) => {
        if (result.status) {
          if (result.message) {
            this.display=false;
            this.toastr.success(result.message);
            this.router.navigate(['/']);
          }
        } else {
          this.errorHandler.basicHandler(result);
        }
      }, (result: any) => {
        this.errorHandler.criticalHandler(result);
      });
    } else {
      this.toastr.error('Please fill required fields');
    }
  }

  add() {
    this.display=true; 
    this.clear(); 
  }

  ngOnDestroy() {
    
  }

  edit(id){
    this.clear();
    this.display=true;
    this.inhouseService.getDetailById({
      id:id
    }).subscribe((res)=>{
      if(res.status) {
        this.registerForm.controls['name'].setValue(res.data.name);
        this.registerForm.controls['email'].setValue(res.data.email);
        this.registerForm.controls['phone'].setValue(res.data.phone);
        this.registerForm.controls['pan'].setValue(res.data.pan);
        this.registerForm.controls['pincode'].setValue(res.data.pincode);
        this.registerForm.controls['gst'].setValue(res.data.gst);

        for(let bank of res.data.banks) {
          this.t.push(this.formBuilder.group({
            bank: new FormControl(bank.bank, [Validators.required]),    
            branchname: new FormControl(bank.branchname, [Validators.required]),    
            accountno: new FormControl(bank.accountno, [Validators.required]),    
            accounttype: new FormControl(bank.accounttype, [Validators.required]),    
            ifsccode: new FormControl(bank.ifsccode, [Validators.required])
          }));
        }
        this.selectedId = res.data.id;
      }
    })
  }

  clear(){
    this.registerForm.reset();
    this.selectedId  = 0;
  }

  removeBank(index) {
    this.bankFormGroups.splice(index,1);
  }

}
