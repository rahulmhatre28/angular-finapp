import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable()
export class RoleService {

    constructor(private dataservice: ApiService) { }

    getAll(req: any=null) {
        return this.dataservice.get('/role', req);
    }
    
    post(req: any) {
        return this.dataservice.post('/role', req);
    }

    put(req: any) {
        return this.dataservice.put('/role', req);
    }

}
