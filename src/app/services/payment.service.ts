import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable()
export class PaymentService {

    constructor(private dataservice: ApiService) { }

    get(req: any=null) {
        return this.dataservice.get('/payment', req);
    }

    getByLoanId(req: any=null) {
        return this.dataservice.get('/payment/'+req.loan_id, req);
    }
    
    post(req: any) {
        return this.dataservice.post('/payment', req);
    }

    put(req: any) {
        return this.dataservice.put('/payment', req);
    }

}
