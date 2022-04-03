import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable()
export class BankService {

    constructor(private dataservice: ApiService) { }

    list(req: any=null) {
        return this.dataservice.get('/bank/list', req);
    }

    lenders(req: any=null) {
        return this.dataservice.get('/bank/lenders', req);
    }
    
    post(req: any) {
        return this.dataservice.post('/bank', req);
    }

    put(req: any) {
        return this.dataservice.put('/bank', req);
    }

}
