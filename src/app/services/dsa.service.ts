import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable()
export class DsaService {

    constructor(private dataservice: ApiService) { }
    
    upload(req: any) {
        return this.dataservice.postFile('/dsa_user_upload', req);
    }
    ytdUpload(req: any) {
        return this.dataservice.postFile('/ytd_upload', req);
    }
    dailyUpload(req: any) {
        return this.dataservice.postFile('/daily_upload', req);
    }
    report(req: any=null) {
        return this.dataservice.get('/report', req);
    }
    ddl(req: any=null) {
        return this.dataservice.get('/reportddl', req);
    }

}
