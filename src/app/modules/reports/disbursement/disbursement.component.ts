import { Component, OnInit } from '@angular/core';
import { LoanService } from '@services/loan.service';

@Component({
  selector: 'app-disbursement',
  templateUrl: './disbursement.component.html',
  styleUrls: ['./disbursement.component.scss'],
  providers:[LoanService]
})
export class DisbursementComponent implements OnInit {
  data: any;

  constructor(private loanService:LoanService) { }

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport() {
    this.loanService.report().subscribe((res:any)=>{
      if(res.status) {
        this.data = res.data;
      }
    })
  }

}
