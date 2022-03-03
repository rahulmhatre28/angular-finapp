import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable()
export class LocationService {

    constructor(private dataservice: ApiService) { }

    getAll(req: any=null) {
        return this.dataservice.get('/location', req);
    }

    getByParams(req: any=null) {
        return this.dataservice.get('/location/getByParams', req);
    }
}
