import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable()
export class LoanService {

    constructor(private dataservice: ApiService) { }

    getAll(req: any=null) {
        return this.dataservice.get('/loan', req);
    }
    
    post(req: any) {
        return this.dataservice.postFile('/loan', req);
    }

    put(req: any,id:number) {
        return this.dataservice.putFile('/loan/update/'+id, req);
    }

    getDetailById(req:any=null) {
        return this.dataservice.get('/loan/'+req.id,null);
    }

    upsert(req:any){
        if(req.get('id')==0){
            return this.post(req);
        } else {
            return this.put(req,req.get('id'));
        }
    }

    delete(id:number) {
        return this.dataservice.delete('/loan/'+id);
    }

    assign(req:any){
        return this.dataservice.post('/loan/assign', req);
    }
    assignSalesPerson(req:any){
        return this.dataservice.post('/loan/assignperson', req);
    }

    disbursed(req:any){
        return this.dataservice.postFile('/loan/disbursed', req);
    }

    getDisbursedDetails(req:any) {
        return this.dataservice.get('/loan/disbursed/'+req.id,req);
    }

    report(req:any=null) {
        return this.dataservice.get('/report',req);
    }

}
