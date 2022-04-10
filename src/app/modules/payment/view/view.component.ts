import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChannelService } from '@services/channel.service';
import { GlobalService } from '@services/global.service';
import { PaymentService } from '@services/payment.service';
import { ToastrService } from 'ngx-toastr';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers:[PaymentService, ChannelService]
})
export class ViewComponent implements OnInit {
  dataList: any=[];
  totalRecords: number;
  cols: any[];
  loading: boolean;
  representatives: any;
  selectAll: boolean = false;
  selectedCustomers:any;
  buttons: any = [];
  displayChannelInvoiceDialog:boolean = false;
  displayPaymentDetailDialog:boolean = false;
  bankList: any;
  @ViewChild(Table) table: Table;
  roleid = null;

  paymentForm:FormGroup;
  paymentData: any = {disbursement_amount:null,channel_payout_percent:null,payable_amount:null,net_amount:null,tax:null,net_payable:null,approved:0,id:null,approved_on:null};

  constructor(private paymentService:PaymentService,private router:Router, private channelService:ChannelService,private toastr: ToastrService,private global:GlobalService) { }

  ngOnInit(): void {
    this.buttons=[];
    this.paymentForm = new FormGroup({
      loan_id: new FormControl(0, Validators.required),
      channel_id: new FormControl(0, Validators.nullValidator),
      borrower_id: new FormControl(0, Validators.nullValidator),
      payment_status: new FormControl('', Validators.required),
      bank_id: new FormControl('', Validators.required),
      note: new FormControl('', Validators.nullValidator),
    });
    this.roleid = this.global.getUser.role_id;
  }

  buttonClick(event){
    switch(event){
      case 'add':this.router.navigate(['#']);
          break;
      default:return true;
    }
  }

  get form() {
    return this.paymentForm.controls;
  }


  loadData(event: LazyLoadEvent){
    this.loading = true;
    this.paymentService.get({lazyEvent: JSON.stringify(event)}).subscribe((res)=>{
      if(res.status){
        this.dataList=res.data.records;
        this.totalRecords = res.data.total;
        this.loading = false;
      }
      else {
        this.dataList=[];
      }
    })
  }

  manage(item) {
    this.displayChannelInvoiceDialog=true;
    this.form['loan_id'].setValue(item.id);
    this.form['channel_id'].setValue(item.channel_id);
    this.form['borrower_id'].setValue(item.borrower_id);
    this.loadBanks(item.channel_id);
  }

  loadBanks(channel_id) {
    this.channelService.banks({
      id:channel_id
    }).subscribe((res)=>{
      if(res.status) {
        this.bankList = res.data;
      }
      else {
        this.bankList = [];
      }
    });
  }

  submitPayment() {
    this.paymentService.post(this.paymentForm.value).subscribe((res)=>{
      if(res.status) {
        this.displayChannelInvoiceDialog=false;
        this.paymentForm.reset();
        this.toastr.success(res.message);
        this.loadData(this.table.createLazyLoadMetadata());
      }
      else {
        this.toastr.error(res.message);
      }
    })
  }

  viewPaymentDetails(item) {
    this.displayPaymentDetailDialog=true;
    this.paymentService.getByLoanId({
      loan_id:item.id
    }).subscribe((res)=>{
      if(res.status) {
        this.paymentData = res.data;
      }
    })
  }

  approvePayment(item) {
    this.paymentService.put({
      id:item.id
    }).subscribe((res)=>{
      if(res.status) {
        this.toastr.success('Approved successfully');
        this.displayPaymentDetailDialog=false;
      }
    })
  }
}
