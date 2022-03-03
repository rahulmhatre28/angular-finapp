import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

@Component({
  selector: 'app-moms',
  templateUrl: './moms.component.html',
  styleUrls: ['./moms.component.scss'],
  providers: [ConfirmationService, MessageService]
})

export class MomsComponent implements OnInit {

    groups: any = [];
    selectedGroup: any[];
    momList: any = [];
    totalRecords: number;
    momDialog: boolean;
    cols: any[];
    loading: boolean;
    status: any = [];
    selectAll: boolean = false;
    selectedCustomers: any = [];
    submitted: boolean;
    momid: any = 0;
    lblrow1: string;
    selectedMaster: any = '';
    mom: any = {
      code: '',
      name: '',
      description: '',
      groups: '',
      remark: '',
      active: true,
      usercreated: ''
    };
  showGrid: boolean;

  constructor() {
      this.groups = [
          {name: 'New York', code: 'NY'},
          {name: 'Rome', code: 'RM'},
          {name: 'London', code: 'LDN'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'}
      ];

      this.status = [
        {active: "Yes", value: 1},
        {active: "N0", value: 0},
    ];

    this.loading = true;
  }

  ngOnInit(): void {
  }

  loadMomList(event: LazyLoadEvent) {
    this.loading = true;

    setTimeout(() => {
        this.momList = [{'name':'test'},{'name':'test'},{'name':'test'}];
        this.totalRecords = 3;
        this.loading = false;
    }, 1000);
  }

  onSelectionChange(value = []) {
      this.selectAll = value.length === this.totalRecords;
      this.selectedCustomers = value;
  }


  edit(){
    this.momDialog = true;
  }

  Addnew(){
    this.momDialog = true;
  }

  hideDialog() {
      this.momDialog = false;
      this.submitted = false;
  }

  saveMom(){

  }

  checkAvailability() {
   
  }

  onRowClick(d) {
   // this.clear();
   debugger;
    this.showGrid = true;
    //this.buttons[0].disabled = false;
    this.selectedMaster = d;
    this.mom.groups = d.code;
    //this.bindGrid();
  }



}
