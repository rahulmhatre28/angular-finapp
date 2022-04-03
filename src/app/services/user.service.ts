import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable()
export class UserService {

    constructor(private dataservice: ApiService) { }

    getAll(req: any=null) {
        return this.dataservice.get('/user', req);
    }
    
    post(req: any) {
        return this.dataservice.post('/user', req);
    }

    put(req: any,id:number) {
        return this.dataservice.put('/user/'+id, req);
    }

    getDetailById(req:any=null) {
        return this.dataservice.get('/user/'+req.id,null);
    }

    upsert(req:any,id:number){
        if(id==0){
            return this.post(req);
        } else {
            return this.put(req,id);
        }
    }

    getchild(req: any=null) {
        return this.dataservice.get('/user/getchild', req);
    }

    getDDL(req: any=null) {
        return this.dataservice.get('/user/ddl', req);
    }

}
