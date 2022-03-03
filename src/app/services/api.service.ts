import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GlobalService} from "@services/global.service";
import {Observable, throwError} from "rxjs";
import {ConfigModel} from "@/model/Config";
import {catchError, finalize, map} from "rxjs/operators";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  config: ConfigModel;
  myParams: any;
  php_api_root: string;

  constructor(private http: HttpClient, private globalService: GlobalService, private router: Router) {
    this.config = globalService.env_config;
    this.php_api_root = this.config.api_php;
  }

  setHeader() {
    let option = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    if (this.globalService.getUser!=null) {
      option["User-id"] = this.globalService.getUser.id.toString();
    }
    if (this.globalService.token) {
      option["Authorization"] = 'Bearer ' + this.globalService.token;
    }
    return new HttpHeaders(option);
  }

  get(url: string, {...objParams}: object): Observable<any> {
    this.globalService.showLoader();
    url = this.config.api_php + url;
    this.myParams = new HttpParams();
    for (let key in objParams) {
      this.myParams = this.myParams.set(key, objParams[key]);
    }
    const options = {params: this.myParams, headers: this.setHeader()};
    return this.http.get(url, options).pipe(
      map((data: any) => {
        return data;
      })).pipe(
      catchError((err) => {
        if (err.status == 401) {
          this.globalService.logout();
        }
        return throwError(err);
      })
    ).pipe(finalize(() => {
      this.globalService.hideLoader();
    }));
  }

  post(url: string, {...objParams}: object): Observable<any> {
    this.globalService.showLoader();
    url = this.config.api_php + url;
    return this.http.post(url, objParams, {headers: this.setHeader()}).pipe(map((data: any) => {
      return data;
    })).pipe(
      catchError((err) => {
        if (err.status == 401) {
          this.globalService.logout();
        }
        return throwError(err);
      })
    ).pipe(finalize(() => {
      this.globalService.hideLoader();
    }));
  }

  put(url: string, {...objParams}: object): Observable<any> {
    this.globalService.showLoader();
    url = this.config.api_php + url;
    return this.http.put(url, objParams, {headers: this.setHeader()}).pipe(map((data: any) => {
      return data;
    })).pipe(
      catchError((err) => {
        if (err.status == 401) {
          this.globalService.logout();
        }
        return throwError(err);
      })
    ).pipe(finalize(() => {
      this.globalService.hideLoader();
    }));
  }

  delete(url: string): Observable<any> {
    this.globalService.showLoader();
    url = this.config.api_php + url;
    return this.http.delete(url, {headers: this.setHeader()}).pipe(map((data: any) => {
      return data;
    })).pipe(
      catchError((err) => {
        if (err.status == 401) {
          this.globalService.logout();
        }
        return throwError(err);
      })
    ).pipe(finalize(() => {
      this.globalService.hideLoader();
    }));
  }

  postFile(url: string,objParams: FormData): Observable<any> {
    this.globalService.showLoader();
    url = this.config.api_php + url;
    return this.http.post(url, objParams, {headers:{
      'User-id':this.globalService.getUser.id.toString()
    }}).pipe(map((data: any) => {
      return data;
    })).pipe(
      catchError((err) => {
        if (err.status == 401) {
          this.globalService.logout();
        }
        return throwError(err);
      })
    ).pipe(finalize(() => {
      this.globalService.hideLoader();
    }));
  }

  putFile(url: string,objParams: FormData): Observable<any> {
    this.globalService.showLoader();
    url = this.config.api_php + url;
    return this.http.put(url, objParams, {headers:{
      'User-id':this.globalService.getUser.id.toString()
    }}).pipe(map((data: any) => {
      return data;
    })).pipe(
      catchError((err) => {
        if (err.status == 401) {
          this.globalService.logout();
        }
        return throwError(err);
      })
    ).pipe(finalize(() => {
      this.globalService.hideLoader();
    }));
  }

}
