import {Component} from '@angular/core';
import { DashboardService } from '@services/dashboard.service';
import { UserService } from '@services/user.service';
import moment from 'moment';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers:[DashboardService, UserService]
})
export class DashboardComponent {

    multiAxisData: any;

    multiAxisOptions: any;

    data:any={
        users:0,
        application:0,
        sanctioned:0,
        disbursed:0,
        graph:[]
    }

    form :any ={
        rangeDates:[moment().toDate(),moment().toDate()],
        uid:null
    }
    userList: any = [];

    constructor(private dashboardService:DashboardService, private userService:UserService) {

    }

    ngOnInit() { 
        this.multiAxisData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
            datasets: []
        };

        this.multiAxisOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };
        this.loadUser();
        this.loadData();
    }

    loadData() {
        this.multiAxisData.datasets=[];
        this.dashboardService.data({
            'fromdate':moment(this.form.rangeDates[0]).format('YYYY-MM-DD'),
            'todate':moment(this.form.rangeDates[1]).format('YYYY-MM-DD'),
            'uid':this.form.uid
        }).subscribe((res)=>{
            if(res.status) {
                this.data = res.data;
                this.multiAxisData.datasets = res.data.graph;
            }
        })
    }
    
    async loadUser() {
        await this.userService.getDDL().subscribe((res)=>{
            if(res.status) {
                this.userList = res.data;
            }
        })
    }
}
