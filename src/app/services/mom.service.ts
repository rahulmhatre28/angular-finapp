import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable()
export class MomService {

    constructor(private dataservice: ApiService) { }

    getAll(req: any=null) {
        return this.dataservice.get('/mom', req);
    }

    getByParams(req: any=null) {
        return this.dataservice.get('/mom/getByParams', req);
    }
    
    post(req: any) {
        return this.dataservice.postFile('/mom', req);
    }

    put(req: any,id:number) {
        return this.dataservice.putFile('/mom/'+id, req);
    }

    getDetailById(req:any=null) {
        return this.dataservice.get('/mom/'+req.id,null);
    }

    upsert(req:any){
        if(req.get('id')==0){
            return this.post(req);
        } else {
            return this.put(req,req.get('id'));
        }
    }

    delete(id:number) {
        return this.dataservice.delete('/mom/'+id);
    }

}
