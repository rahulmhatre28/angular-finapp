import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable()
export class DashboardService {

    constructor(private dataservice: ApiService) { }

    data(req: any=null) {
        return this.dataservice.get('/dashboard', req);
    }
}
