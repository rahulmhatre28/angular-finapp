import {
  Component,
  OnInit,
  Renderer2,
  OnDestroy,
  HostBinding,
  ViewChild
} from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from "@services/auth.service";
import {ErrorService} from "@services/error.service";
import {GlobalService} from "@services/global.service";
import {ActivatedRoute, Router} from "@angular/router";
import { RoleService } from '@services/role.service';
import { LoanService } from '@services/loan.service';
import { FileUpload } from 'primeng/fileupload';
import { MomService } from '@services/mom.service';
import { LocationService } from '@services/location.service';
import { ChannelService } from '@services/channel.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers:[RoleService,LoanService, MomService, LocationService, ChannelService, UserService]
})
export class AddComponent implements OnInit, OnDestroy {

  public loanForm: FormGroup;
  display: boolean;
  roleList: any=[];
  userList: any=[];
  selectedId: number=0;
  buttons:any=[];
  KYCDocTypeList:any=[
    {id:1,name:'Pan Card'},
    {id:2,name:'AADHAR Card'},
  ];

  @ViewChild('KYCDocs') KYCDocs : FileUpload;
  @ViewChild('FinanceDocs') FinanceDocs : FileUpload;
  @ViewChild('OtherDocs') OtherDocs : FileUpload;
  loan_type_list: any=[];
  business_loan_list: any=[];
  salaried_loan_list: any=[];
  other_loans_list: any=[];
  loan_product_group_list: any=[];
  property_type_list: any=[];
  loan_usage_type_list: any=[];
  loan_sub_type_list: any=[];
  business_type_list: any=[];
  borrower_type_list: any=[];
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];
  businessStateList: any=[];
  businessCityList: any=[];
  channelList: any=[];
  through_channel:boolean=false;
  roleid: number=0;
  salesManagerList: any=[];
  salesExecutiveList: any=[];
  executiveList: any=[];
  branchHeadList: any=[];

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private errorHandler: ErrorService,
    public globalService: GlobalService,
    private router: Router,
    private authService:AuthService,
    private roleService:RoleService,
    private loanService:LoanService,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private momService:MomService,
    private locationService:LocationService,
    private channelService:ChannelService,
    private userService:UserService
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
    this.roleid = this.globalService.getUser.role_id;
    this.loanForm = new FormGroup({
      channel_id: new FormControl(null, Validators.nullValidator),
      loan_option_type: new FormControl(0, Validators.nullValidator),
      loan_type: new FormControl(0, Validators.nullValidator),
      loan_other_type: new FormControl(0, Validators.nullValidator),
      annual_pat: new FormControl(null, Validators.nullValidator),
      annual_pat_inlakhs: new FormControl(false, Validators.nullValidator),
      loan_amount: new FormControl(null, Validators.nullValidator),
      loan_amount_inlakhs: new FormControl(false, Validators.nullValidator),
      loan_product_group: new FormControl(0, [Validators.nullValidator]),
      property_type: new FormControl(0, [Validators.nullValidator]),
      annual_turnover: new FormControl(null, [Validators.nullValidator]),
      annual_turnover_inlakhs: new FormControl(false, [Validators.nullValidator]),
      loan_usage_type: new FormControl(0, [Validators.nullValidator]),
      loan_sub_type: new FormControl(0, [Validators.nullValidator]),
      business_type: new FormControl(0, [Validators.nullValidator]),
      business_name: new FormControl(null, [Validators.nullValidator]),
      business_years: new FormControl(null, [Validators.nullValidator]),
      business_years_inyear: new FormControl(false, [Validators.nullValidator]),
      business_gst: new FormControl(null, [Validators.nullValidator]),
      business_pincode: new FormControl(null, [Validators.nullValidator]),
      business_location: new FormControl(null, [Validators.nullValidator]),
      business_city: new FormControl(0, [Validators.nullValidator]),
      business_state: new FormControl(0, [Validators.nullValidator]),
      business_address_line_1: new FormControl(null, [Validators.nullValidator]),
      business_address_line_2: new FormControl(null, [Validators.nullValidator]),
      existing_profile: new FormControl(0, [Validators.nullValidator]),
      borrower_type: new FormControl(0, [Validators.nullValidator]),
      net_income: new FormControl(null, [Validators.nullValidator]),
      net_income_inlakhs: new FormControl(false, Validators.nullValidator),
      gross_income: new FormControl(null, [Validators.nullValidator]),
      gross_income_inlakhs: new FormControl(false, Validators.nullValidator),
      applicants: new FormArray([]),
    });

    if(this.roleid == 1) {
      
      this.loanForm.addControl('b_head',new FormControl('', [Validators.required]));
      this.loanForm.addControl('b_sales_manager',new FormControl('', [Validators.required]));
      this.loanForm.addControl('sales_executive',new FormControl('', [Validators.required]));
      this.loanForm.addControl('executive',new FormControl('', [Validators.required]));
    }
    else if(this.roleid == 2) {
      
      this.loanForm.addControl('b_sales_manager',new FormControl('', [Validators.required]));
      this.loanForm.addControl('sales_executive',new FormControl('', [Validators.required]));
      this.loanForm.addControl('executive',new FormControl('', [Validators.required]));
    }
    else if(this.roleid == 3) {
      
      this.loanForm.addControl('sales_executive',new FormControl('', [Validators.required]));
      this.loanForm.addControl('executive',new FormControl('', [Validators.required]));
    }
    else if(this.roleid == 4) {
      
      this.loanForm.addControl('executive',new FormControl('', [Validators.required]));
    }
    else if(this.roleid == 5) {
      
      this.loanForm.addControl('executive',new FormControl(this.globalService.getUser.id, [Validators.nullValidator]));
    }
    else if(this.roleid == 9) {
  
      this.loanForm.addControl('executive',new FormControl(0, [Validators.nullValidator]));
    }

    this.loadUser(this.roleid,this.globalService.getUser.id);

    this.loadDropDowns();
    this.loadLocation('state',101);
    this.loadLocation('business_state',101);

    if(this.route.snapshot.paramMap.has('channelid')){
      let id: any = this.route.snapshot.paramMap.get('channelid');
      this.f['channel_id'].setValue(id);
      this.through_channel=true;
    } else if(this.roleid==9){
      let id: any = this.globalService.getUser.id;
      this.f['channel_id'].setValue(id);
      this.through_channel=true;
    } else {
      this.loadChannel();
    }

    if (this.route.snapshot.paramMap.has('id')) {
      let id: any = this.route.snapshot.paramMap.get('id');
      this.buttons[0].hidden = false;
      this.buttons[1].hidden = true;
      this.edit(id);
    }
    else  {
      this.addApplicant();
    }
  }

  buttonClick(event){
    switch(event){
      case 'reset':this.clear();
          break;
      case 'save':this.save();
          break;
      case 'back':this.router.navigate(['/Admin/loan/']);
          break;
      default:return true;
    }
  }

  get f() {
    return this.loanForm.controls;
  }

  get t() { return this.f.applicants as FormArray; }
  get applicantFormGroups() { return this.t.controls as FormGroup[]; }

  addApplicant() {
    this.t.push(this.formBuilder.group({
      fname: new FormControl(null, [Validators.nullValidator]),
      lname: new FormControl(null, [Validators.nullValidator]),
      email: new FormControl(null, [Validators.nullValidator]),
      phone_1: new FormControl(null, [Validators.nullValidator]),
      phone_2: new FormControl(null, [Validators.nullValidator]),
      pincode: new FormControl(null, [Validators.nullValidator]),
      locality: new FormControl(null, [Validators.nullValidator]),
      city: new FormControl(0, [Validators.nullValidator]),
      state: new FormControl(0, [Validators.nullValidator])
    }));
  }

  async save() {
    if (this.loanForm.valid) {
      let formData:any = new FormData();
      formData.append('channel_id',this.f["channel_id"].value);
      formData.append('loan_option_type',this.f["loan_option_type"].value);
      formData.append('loan_type',this.f["loan_type"].value);
      formData.append('loan_other_type',this.f["loan_other_type"].value);
      formData.append('annual_pat',this.f["annual_pat"].value);
      formData.append('annual_pat_inlakhs',this.f["annual_pat_inlakhs"].value);
      formData.append('loan_amount',this.f["loan_amount"].value);
      formData.append('loan_amount_inlakhs',this.f["loan_amount_inlakhs"].value);
      formData.append('loan_product_group',this.f["loan_product_group"].value);
      formData.append('property_type',this.f["property_type"].value);
      formData.append('annual_turnover',this.f["annual_turnover"].value);
      formData.append('annual_turnover_inlakhs',this.f["annual_turnover_inlakhs"].value)
      formData.append('loan_usage_type',this.f["loan_usage_type"].value);
      formData.append('loan_sub_type',this.f["loan_sub_type"].value);
      formData.append('business_type',this.f["business_type"].value);
      formData.append('business_name',this.f["business_name"].value);
      formData.append('business_years',this.f["business_years"].value);
      formData.append('business_years_inyear',this.f["business_years_inyear"].value)
      formData.append('business_gst',this.f["business_gst"].value);
      formData.append('business_pincode',this.f["business_pincode"].value);
      formData.append('business_location',this.f["business_location"].value);
      formData.append('business_city',this.f["business_city"].value);
      formData.append('business_state',this.f["business_state"].value);
      formData.append('business_address_line_1',this.f["business_address_line_1"].value);
      formData.append('business_address_line_2',this.f["business_address_line_2"].value);
      formData.append('existing_profile',this.f["existing_profile"].value);
      formData.append('borrower_type',this.f["borrower_type"].value);
      formData.append('net_income',this.f["net_income"].value);
      formData.append('net_income_inlakhs',this.f["net_income_inlakhs"].value);
      formData.append('gross_income',this.f["gross_income"].value);
      formData.append('gross_income_inlakhs',this.f["gross_income_inlakhs"].value);
      formData.append('executive',this.f["executive"].value);
      
      for(let i in this.applicantFormGroups){
        formData.append('applicants[]', JSON.stringify({
          fname:this.applicantFormGroups[i].controls["fname"].value,
          lname:this.applicantFormGroups[i].controls["lname"].value,
          email:this.applicantFormGroups[i].controls["email"].value,
          phone_1:this.applicantFormGroups[i].controls["phone_1"].value,
          phone_2:this.applicantFormGroups[i].controls["phone_2"].value,
          pincode:this.applicantFormGroups[i].controls["pincode"].value,
          locality:this.applicantFormGroups[i].controls["locality"].value,
          city:this.applicantFormGroups[i].controls["city"].value,
          state:this.applicantFormGroups[i].controls["state"].value
        }));
      }

      for(let i in this.KYCDocs._files) {
        formData.append('kyc_files[]', this.KYCDocs._files[i]);
      }

      for(let i in this.FinanceDocs._files) {
        formData.append('finance_files[]', this.FinanceDocs._files[i]);
      }

      for(let i in this.OtherDocs._files) {
        formData.append('other_files[]', this.OtherDocs._files[i]);
      }

      for (let value of formData.entries()) {
        console.log(value);
      }
      formData.append('id', this.selectedId);
      this.loanService.upsert(formData).subscribe((result: any) => {
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
      this.toastr.error('Please fill nullValidator fields');
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
    this.loanService.getDetailById({
      id:id
    }).subscribe((res)=>{
      if(res.status) {
        this.loanForm.controls['name'].setValue(res.data.name);
        this.loanForm.controls['email'].setValue(res.data.email);
        this.loanForm.controls['phone'].setValue(res.data.phone);
        this.loanForm.controls['pan'].setValue(res.data.pan);
        this.loanForm.controls['pincode'].setValue(res.data.pincode);
        this.loanForm.controls['gst'].setValue(res.data.gst);

        for(let bank of res.data.banks) {
          this.t.push(this.formBuilder.group({
            bank: new FormControl(bank.bank, [Validators.nullValidator]),    
            branchname: new FormControl(bank.branchname, [Validators.nullValidator]),    
            accountno: new FormControl(bank.accountno, [Validators.nullValidator]),    
            accounttype: new FormControl(bank.accounttype, [Validators.nullValidator]),    
            ifsccode: new FormControl(bank.ifsccode, [Validators.nullValidator])
          }));
        }
        this.selectedId = res.data.id;
      }
    })
  }

  clear(){
    this.loanForm.reset();
    this.selectedId  = 0;
  }

  removeApplicant(index) {
    this.applicantFormGroups.splice(index,1);
  }

  onSelectFile(event){
    console.log(event.files);
    console.log(this.KYCDocs);
    //this.KYCDocs._files.splice(1,1)
  }

  loadDropDowns() {
    this.loan_type_list=[];
    this.business_loan_list=[];
    this.salaried_loan_list=[];
    this.other_loans_list=[];
    this.loan_product_group_list=[];
    this.property_type_list=[];
    this.loan_usage_type_list=[];
    this.loan_sub_type_list=[];
    this.business_type_list=[];
    this.borrower_type_list=[];
    this.momService.getByParams({
      groups:JSON.stringify([
        'loan_type',
        'business_loan',
        'salaried_loan',
        'other_loans',
        'loan_product_group',
        'property_type',
        'loan_usage_type',
        'loan_sub_type',
        'business_type',
        'borrower_type',
      ])
    }).subscribe((res)=>{
      if(res.status){
        let data = res.data;
        this.loan_type_list=data.filter((a)=>{ return a.group==='loan_type';})
        this.business_loan_list=data.filter((a)=>{ return a.group==='business_loan';})
        this.salaried_loan_list=data.filter((a)=>{ return a.group==='salaried_loan';})
        this.other_loans_list=data.filter((a)=>{ return a.group==='other_loans';})
        this.loan_product_group_list=data.filter((a)=>{ return a.group==='loan_product_group';})
        this.property_type_list=data.filter((a)=>{ return a.group==='property_type';})
        this.loan_usage_type_list=data.filter((a)=>{ return a.group==='loan_usage_type';})
        this.loan_sub_type_list=data.filter((a)=>{ return a.group==='loan_sub_type';})
        this.business_type_list=data.filter((a)=>{ return a.group==='business_type';})
        this.borrower_type_list=data.filter((a)=>{ return a.group==='borrower_type';})
      }
    })
  }

  loadLocation(type:string,id:number=null) {
    this.locationService.getByParams({
      type:type,
      id:id
    }).subscribe((res)=>{
      if(res.status){
        let data = res.data;
        if(type=='state') {
          this.stateList = data;
        }
        else if(type=='city') {
          this.cityList = data;
        }
        else if(type=='business_state') {
          this.businessStateList = data;
        }
        else if(type=='business_city') {
          this.businessCityList = data;
        }
      }
      else {
        if(type=='country') {
          this.countryList = [];
        } else if(type=='state') {
          this.stateList = [];
        }
        else if(type=='city') {
          this.cityList = [];
        }else if(type=='business_state') {
          this.businessStateList = [];
        }
        else if(type=='business_city') {
          this.businessCityList = [];
        }
      }
    })
  }

  removeDocument(inpProp:FileUpload,index:number) {
    inpProp._files.splice(index,1);
  }

  loadChannel() {
    this.channelService.dropdown({
      id: this.f['executive'].value
    }).subscribe((res)=>{
      if(res.status){
        this.channelList=res.data;
      }
    })
  }

  loadUser(role_id,id) {
    this.userService.getchild({
      id:id,
      type:role_id
    }).subscribe((res)=>{
      if(res.status) {
        if(role_id==1){
          this.branchHeadList=res.data;
        }
        else if(role_id==2){
          this.salesManagerList=res.data;
        }
        else if(role_id==3){
          this.salesExecutiveList=res.data;
        }
        else if(role_id==4){
          this.executiveList=res.data;
        }
      }
    })
  }

  


}
