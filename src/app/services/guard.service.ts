import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { GlobalService } from './global.service';
import { UserModel } from '../model/User';
import { ApiService } from './api.service';
@Injectable({ providedIn: 'root' })
export class MenuGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(private _router: Router, private global: GlobalService, private dataservice: ApiService) {}
  
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkFun(route, state);
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkFun(route, state);
  }

  public canLoad() {
    return true;
  }

  private checkFun(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const that = this;
    const routeconfig = route.data;
    const checks = that.checkCredentials();
    this.global.setCurrentMenu(routeconfig.code); 

    return Observable.create((observer: Subject<boolean>) => {
      if (localStorage.getItem('user_data') == null) {
        this._router.navigate(['/login']);
        observer.next(true);
      } else
        if (checks.refresh) {
          try
          {
            this.dataservice.get('/menu/menuAccess/'+routeconfig.code,null).subscribe((res: any) => {
              if (res.status) {
                let data = res.data[0];
                if (data.action != null) {
                  this.global.setMenuActions(data.action);
                  observer.next(true);
                }
                else {
                  console.log('Menu actions are missing');
                  that._router.navigate(['/500']);
                  observer.next(true);
                }
              }
              else {
                console.log(res.message);
                that._router.navigate(['/500']);
                observer.next(true);
              }
            }, (ex) => {
              console.log('Menu access api has 500 error');
              that._router.navigate(['/500']);
              observer.next(true);
            });
          }
          catch(err) {
            console.log(err);
            that._router.navigate(['/500']);
            observer.next(true);
          }
        } else {
          that._router.navigate(['/login']);
          observer.next(true);
        }
    });
  }

  public checkCredentials(): any {
    const usr: UserModel = this.global.getUser;
    if (usr !== null) { 
      return { 'refresh': true };
    }
  }
}
