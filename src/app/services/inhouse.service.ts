import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable()
export class InhouseService {

    constructor(private dataservice: ApiService) { }

    getAll(req: any=null) {
        return this.dataservice.get('/inhouse', req);
    }
    
    post(req: any) {
        return this.dataservice.post('/inhouse', req);
    }

    put(req: any,id:number) {
        return this.dataservice.put('/inhouse/'+id, req);
    }

    getDetailById(req:any=null) {
        return this.dataservice.get('/inhouse/'+req.id,null);
    }

    upsert(req:any,id:number){
        if(id==0){
            return this.post(req);
        } else {
            return this.put(req,id);
        }
    }

    delete(id:number) {
        return this.dataservice.delete('/inhouse/'+id);
    }

}
