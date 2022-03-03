import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable()
export class ChannelService {

    constructor(private dataservice: ApiService) { }

    getAll(req: any=null) {
        return this.dataservice.get('/channel', req);
    }
    
    dropdown(req: any=null) {
        return this.dataservice.get('/channel/dropdown', req);
    }
    
    post(req: any) {
        return this.dataservice.post('/channel', req);
    }

    put(req: any,id:number) {
        return this.dataservice.put('/channel/'+id, req);
    }

    getDetailById(req:any=null) {
        return this.dataservice.get('/channel/'+req.id,null);
    }

    upsert(req:any,id:number){
        if(id==0){
            return this.post(req);
        } else {
            return this.put(req,id);
        }
    }

    delete(id:number) {
        return this.dataservice.delete('/channel/'+id);
    }

}
