import {Component, OnInit} from '@angular/core';
import {DateTime} from 'luxon';
import {AuthService} from "@services/auth.service";
import {GlobalService} from "@services/global.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public user;

    constructor(private authService: AuthService,private globalService:GlobalService) {}

    ngOnInit(): void {
        this.user = this.globalService.getUser || {picture:'',email:''};
    }

    logout() {
        this.authService.logout();
    }

    formatDate(date) {
        return DateTime.fromISO(date).toFormat('dd LLL yyyy');
    }
}
