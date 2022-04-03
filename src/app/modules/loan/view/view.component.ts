import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from '@services/loan.service';
import { LazyLoadEvent } from 'primeng/api';
import {ToastrService} from 'ngx-toastr';
import { Table } from 'primeng/table';
import { BankService } from '@services/bank.service';
import { GlobalService } from '@services/global.service';
import { UserService } from '@services/user.service';
import { FileUpload } from 'primeng/fileupload';
import moment from 'moment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers:[LoanService, BankService, UserService]
})
export class ViewComponent implements OnInit {
  loanList: any=[];
  totalRecords: number;
  cols: any[];
  loading: boolean;
  representatives: any;
  selectAll: boolean = false;
  selectedCustomers:any;
  buttons: any = [];
  displayLoanAssignDialog:boolean=false;
  public assignForm: FormGroup;
  public salesAssignForm: FormGroup;
  public disbursedForm:FormGroup;
  lenderList:any=[];
  bankList:any=[];
  // bankList:any=[{
  //   id:1,
  //   name:'HDFC Bank',
  //   lenderList:[{
  //     id:1,
  //     full_name:'Rahul Mhatre'
  //   },{
  //     id:2,
  //     full_name:'Sameer Patil'
  //   }],
  // },
  // {
  //   id:2,
  //   name:'IDBI Bank',
  //   lenderList:[{
  //     id:3,
  //     name:'Prashant Mhatre'
  //   }]
  // }];
  bank:any='';
  pagetype:String='application';
  @ViewChild(Table) table: Table;
  roleid: number;
  branchHeadList: any=[];
  salesManagerList: any=[];
  salesExecutiveList: any=[];
  executiveList: any=[];
  displaySalesPersonAssignDialog:boolean=false;
  displayLoanDisbursedDialog:boolean=false;
  selectedId:number=0;
  doc_path: string='';

  @ViewChild('loanRepayDoc') loanRepayDoc : FileUpload;
  @ViewChild('channelInvoiceDoc') channelInvoiceDoc : FileUpload;
  @ViewChild('llcDoc') llcDoc : FileUpload;


  constructor(private loanService:LoanService,private router:Router, private formBuilder: FormBuilder,private toastr: ToastrService,private activatedRoute:ActivatedRoute, private bankService:BankService,public global:GlobalService,private userService:UserService) { }

  ngOnInit(): void {
    this.doc_path = this.global.env_config.api_php_public;
    this.roleid = this.global.getUser.role_id;
    if(this.activatedRoute.snapshot.data.type){
      this.pagetype = this.activatedRoute.snapshot.data.type;
    }
    this.loadLenders();
    this.loadUser(this.roleid,this.global.getUser.id);

    this.buttons=[{
      type:'button',class:'btn btn-info',label:'Add',icon:'fa fa-plus',disabled:false,action:'add',access:'add'
    }];
    this.assignForm = new FormGroup({
      loan_id: new FormControl(0, Validators.required),
      loan_status: new FormControl(null, Validators.nullValidator),
      lenderList: new FormControl([], Validators.nullValidator),
      lenders:  new FormArray([]),
      bank: new FormControl('',Validators.nullValidator),
      //is_email_to_be_send: new FormControl(false,Validators.nullValidator)
    });

    this.salesAssignForm = new FormGroup({
      loan_id: new FormControl(0, Validators.required),
      channel_id: new FormControl(0, Validators.nullValidator),
    });

    if(this.roleid == 1) {
      
      this.salesAssignForm.addControl('b_head',new FormControl('', [Validators.required]));
      this.salesAssignForm.addControl('b_sales_manager',new FormControl('', [Validators.required]));
      this.salesAssignForm.addControl('sales_executive',new FormControl('', [Validators.required]));
      this.salesAssignForm.addControl('executive',new FormControl('', [Validators.required]));
    }
    else if(this.roleid == 2) {
      
      this.salesAssignForm.addControl('b_sales_manager',new FormControl('', [Validators.required]));
      this.salesAssignForm.addControl('sales_executive',new FormControl('', [Validators.required]));
      this.salesAssignForm.addControl('executive',new FormControl('', [Validators.required]));
    }

    this.disbursedForm = new FormGroup({
      loan_id: new FormControl(0, Validators.required),
      disbursed_date: new FormControl(null, Validators.required),
      channel_payout_percent: new FormControl(0, Validators.nullValidator),
      lender_payout_percent: new FormControl(0, Validators.nullValidator),
      sanctioned_amount: new FormControl(0, Validators.nullValidator),
      processing_fee: new FormControl(0, Validators.nullValidator),
      lender_loan_id: new FormControl('', Validators.nullValidator),
      remark: new FormControl('', Validators.nullValidator),
      loan_status: new FormControl('', Validators.nullValidator)
    });
  }

  buttonClick(event){
    switch(event){
      case 'add':this.router.navigate(['/Admin/loan/add']);
          break;
      default:return true;
    }
  }

  get f() {
    return this.assignForm.controls;
  }

  get t() {
    return this.f.lenders as FormArray; 
  }
  get lenderFormGroups() { return this.t.controls as FormGroup[]; }

  get f1() {
    return this.salesAssignForm.controls;
  }

  get f2() {
    return this.disbursedForm.controls;
  }

  addLender() {
    if(this.f['bank'].value!='') {
      let value = JSON.parse(this.f['bank'].value);
      let find = this.lenderFormGroups.findIndex((a)=>{
        return a.controls.bank_id.value==value.id;
      });
      if(find<0) {
        this.t.push(this.formBuilder.group({
          bank_id: new FormControl(value.id, [Validators.nullValidator]),
          bankname: new FormControl(value.name, [Validators.nullValidator]),
          bank_user_id: new FormControl('', [Validators.required]),
          lenderList: new FormControl(value.lenderList, [Validators.nullValidator]),
        }));
      }
      else {
        this.toastr.warning('Lender is already exists');
      }
    }
  }


  loadLoan(event: LazyLoadEvent){
    this.loading = true;
    this.loanService.getAll({lazyEvent: JSON.stringify(event),pagetype:this.pagetype}).subscribe((res)=>{
      if(res.status){
        this.loanList=res.data.records;
        if(this.pagetype!='application') {
          let records= [];
          this.loanList.forEach(element => {
            element.lenders = JSON.parse(element.lenders);
            records.push(element);
          });
          this.loanList = records;
        }
        this.totalRecords = res.data.total;
        this.loading = false;
      }
      else {
        this.loanList=[];
      }
    })
  }

  edit(item) {
    this.router.navigate(['/Admin/loan/edit/'+item.id]);
  }

  removeLender(index) {
    this.lenderFormGroups[index].controls["bank_user_id"].disable();
    this.lenderFormGroups.splice(index,1);
    
  }

  assignLoan(item) {
    this.displayLoanAssignDialog=!this.displayLoanAssignDialog;
    if(this.displayLoanAssignDialog) {
      this.f['lenders'].setValue([]);
      this.f['loan_id'].setValue(item.id);
      this.f['loan_status'].setValue(item.loan_status);
      if(item.lenders){
        for(let a of item.lenders) {
          let lenderList=[]; 
          let find = this.bankList.findIndex((element)=>{
            return element.id==a.bank_id;
          });
          if(find>-1) {
            lenderList = this.bankList[find].lenderList;
          }
          this.t.push(this.formBuilder.group({
            bank_id: new FormControl(a.bank_id, [Validators.nullValidator]),
            bankname: new FormControl(a.bank_name, [Validators.nullValidator]),
            bank_user_id: new FormControl(a.bank_user_id, [Validators.required]),
            lenderList: new FormControl(lenderList, [Validators.nullValidator]),
          }));
        }
      }
    }
  }

  saveAssign() {
    if (this.assignForm.valid) {
      let formData:any = {
        loan_id:this.f["loan_id"].value,
        loan_status:this.f["loan_status"].value,
        lenders:[],
      };
      if(this.lenderFormGroups.length==0) {
        this.toastr.warning('Please assign Lender');
        return;
      }
      for(let i in this.lenderFormGroups){
        formData.lenders.push({
          bank_id:this.lenderFormGroups[i].controls["bank_id"].value,
          bank_user_id:this.lenderFormGroups[i].controls["bank_user_id"].value
        });
      }
      this.loanService.assign(formData).subscribe((res)=>{
        if(res.status){
          this.toastr.success(res.message);
          this.displayLoanAssignDialog=false;
          if(this.pagetype=='application') {
            this.loanList = this.loanList.filter((a)=>{
              return a.id!=this.f['loan_id'].value;
            });
          }
          else {
            this.loadLoan(this.table.createLazyLoadMetadata());
          }
        }
        else {
          this.toastr.error(res.message);
        }
      })
    }
    else {
      this.toastr.error('Some field are missing');
    }
  }

  async loadLenders() {
    await this.bankService.lenders().subscribe((res)=>{
      if(res.status){
        this.bankList=res.data.map((a)=>{
          return {'id':a.id,'name':a.bank_name,'lenderList':a.users};
        });
        console.log(this.bankList);
      }
      else {
        this.bankList=[];
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

  assignSalesPerson(item) {
    this.displaySalesPersonAssignDialog=!this.displaySalesPersonAssignDialog;
    if(this.displaySalesPersonAssignDialog) {
      this.f1['loan_id'].setValue(item.id);
      this.f1['channel_id'].setValue(item.channel_id);
    }
  }
  
  saveSalesAssign() {
    if (this.salesAssignForm.valid) {
      this.loanService.assignSalesPerson({
        loan_id:this.f1["loan_id"].value,
        executive:this.f1["executive"].value,
        channel_id:this.f1["channel_id"].value
      }).subscribe((res)=>{
        if(res.status){
          this.toastr.success(res.message);
          this.displaySalesPersonAssignDialog=false;
          this.loadLoan(this.table.createLazyLoadMetadata());
        }
        else {
          this.toastr.error(res.message);
        }
      })
    }
    else {
      this.toastr.error('Some field are missing');
    }
  }

  disbursedLoan(item) {
    this.displayLoanDisbursedDialog=!this.displayLoanDisbursedDialog;
    if(this.displayLoanDisbursedDialog) {
      this.disbursedForm.reset();
      this.loanRepayDoc.clear();
      this.channelInvoiceDoc.clear();
      this.llcDoc.clear();
      this.f2['loan_id'].setValue(item.id);
      this.f2['loan_status'].setValue(item.loan_status);
    }
  }

  onSelectFile(event){
    //console.log(event.files);
    //console.log(this.KYCDocs);
    //this.KYCDocs._files.splice(1,1)
  }

  removeDocument(inpProp:FileUpload,index:number) {
    inpProp._files.splice(index,1);
  }

  saveLoanDisbursment() {
    if (this.disbursedForm.valid) {
      let formData:any = new FormData();
      formData.append('loan_id',this.f2["loan_id"].value);
      formData.append('disbursed_date',moment(this.f2["disbursed_date"].value).format('YYYY-MM-DD'));
      formData.append('channel_payout_percent',this.f2["channel_payout_percent"].value);
      formData.append('lender_payout_percent',this.f2["lender_payout_percent"].value);
      formData.append('sanctioned_amount',this.f2["sanctioned_amount"].value);
      formData.append('processing_fee',this.f2["processing_fee"].value);
      formData.append('lender_loan_id',this.f2["lender_loan_id"].value);
      formData.append('loan_status',this.f2["loan_status"].value);
      formData.append('remark',this.f2["remark"].value);

      for(let i in this.loanRepayDoc._files) {
        if(this.loanRepayDoc._files[i]['id']) continue;
        formData.append('loan_repay_doc[]', this.loanRepayDoc._files[i]);
      }

      for(let i in this.channelInvoiceDoc._files) {
        if(this.channelInvoiceDoc._files[i]['id']) continue;
        formData.append('channel_invoice_doc[]', this.channelInvoiceDoc._files[i]);
      }

      for(let i in this.llcDoc._files) {
        if(this.llcDoc._files[i]['id']) continue;
        formData.append('llc_doc[]', this.llcDoc._files[i]);
      }
      this.loanService.disbursed(formData).subscribe((result: any) => {
        if (result.status) {
          if (result.message) {
            this.displayLoanDisbursedDialog=false;
            this.toastr.success(result.message);
            this.disbursedForm.reset();
            this.loadLoan(this.table.createLazyLoadMetadata());
          }
        } else {
          this.toastr.error(result.message);
        }
      }, (result: any) => {
        let message =result.message;
        if(result.error.message) {
          message=result.error.message
        }
        this.toastr.error(message);
      });
    } else {
      this.toastr.error('Please fill required fields');
    }
  }
  
}
