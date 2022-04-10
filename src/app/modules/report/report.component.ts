import { Component, OnInit } from '@angular/core';
import { DsaService } from '@services/dsa.service';
import moment from 'moment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers:[DsaService]
})
export class ReportComponent implements OnInit {
  reportData: any=[];
  objectKeys = Object.keys;
  header: any=[];
  dropdown: any=[];
  form:any= {
    type:'units',
    product:'',
    profile:'',
    state:'',
    hub:'',
    company_category:'',
    seg_gov_flag:'',
    market:'',
    month:'',
    date1:null,
    date:null,
  };
  monthList:any=[{'name':'Jan'},{'name':'Feb'},{'name':'Mar'},{'name':'Apr'},{'name':'May'},{'name':'Jun'},{'name':'Jul'},{'name':'Aug'},{'name':'Sep'},{'name':'Oct'},{'name':'Nov'},{'name':'Dec'}];

  constructor(private dsaService:DsaService) { }

  ngOnInit(): void {
    this.loadDropdown();
    this.loanReport();
  }

  loanReport() {
    let d = this.form.date1;
    if(d!=null) {
      let dd = typeof d === 'string' ? d.split(',') : d;
      if(dd[1]==undefined) {
        return false;
      }
      this.form.date=moment(dd[0]).format('YYYY-MM-DD')+','+moment(dd[1]).format('YYYY-MM-DD');
    }
    this.dsaService.report(this.form).subscribe((res)=>{
      if(res.status) {
        this.reportData=res.data[0];
        this.header = res.data[1]; 
      }
      else {
        this.reportData=[];
      }
    })
  }

  loadDropdown() {
    this.dsaService.ddl().subscribe((res)=>{
      if(res.status) {
        this.dropdown = res.data;
      }
      else {
        this.dropdown = [];
      }
    });
  }

}
