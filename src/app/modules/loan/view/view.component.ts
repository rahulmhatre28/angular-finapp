import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from '@services/loan.service';
import { LazyLoadEvent } from 'primeng/api';
import {ToastrService} from 'ngx-toastr';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers:[LoanService]
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
  lenderList:any=[];
  bankList:any=[{
    id:1,
    name:'HDFC Bank',
    lenderList:[{
      id:1,
      name:'Rahul Mhatre'
    },{
      id:2,
      name:'Sameer Patil'
    }],
  },
  {
    id:2,
    name:'IDBI Bank',
    lenderList:[{
      id:3,
      name:'Prashant Mhatre'
    }]
  }];
  bank:any='';
  pagetype:String='application';
  @ViewChild(Table) table: Table;


  constructor(private loanService:LoanService,private router:Router, private formBuilder: FormBuilder,private toastr: ToastrService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.data.type){
      this.pagetype = this.activatedRoute.snapshot.data.type;
    }


    this.buttons=[{
      type:'button',class:'btn btn-info',label:'Add',icon:'fa fa-plus',disabled:false,action:'add'
    }];
    this.assignForm = new FormGroup({
      loan_id: new FormControl(0, Validators.required),
      loan_status: new FormControl(null, Validators.nullValidator),
      lenderList: new FormControl([], Validators.nullValidator),
      lenders:  new FormArray([]),
      bank: new FormControl('',Validators.nullValidator),
      //is_email_to_be_send: new FormControl(false,Validators.nullValidator)
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
      let formData:any = new FormData();
      formData.append('loan_id',this.f["loan_id"].value);
      formData.append('loan_status',this.f["loan_status"].value);
      if(this.lenderFormGroups.length==0) {
        this.toastr.warning('Please assign Lender');
        return;
      }
      for(let i in this.lenderFormGroups){
        formData.append('lenders[]', JSON.stringify({
          bank_id:this.lenderFormGroups[i].controls["bank_id"].value,
          bank_user_id:this.lenderFormGroups[i].controls["bank_user_id"].value
        }));
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
}
