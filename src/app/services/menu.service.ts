import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable()
export class MenuService {

    constructor(private dataservice: ApiService) { }

    getAll(req: any=null) {
        return this.dataservice.get('/menu', req);
    }
    
    post(req: any) {
        return this.dataservice.post('/menu', req);
    }

    getByParams(req:any) {
        return this.dataservice.get('/menu/:key/:value', req);
    }

    list(req: any=null) {
        return this.dataservice.get('/menu/list', req);
    }

}
