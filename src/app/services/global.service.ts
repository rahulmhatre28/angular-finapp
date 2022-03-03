import {Injectable} from '@angular/core';
import {UserModel} from '@/model/User';
import {ConfigModel} from "@/model/Config";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {AuthService} from "@services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public is_loading: boolean = false;

  constructor(private router: Router) {
  }

  set token(value: string) {
    localStorage["token"] = value;
  }

  get token(): string {
    return localStorage["token"];
  }

  set setUser(value: UserModel) {
    localStorage["user_data"] = JSON.stringify(value);
  }

  get getUser(): UserModel {
    if(localStorage["user_data"]){
      return JSON.parse(localStorage["user_data"]) as UserModel;
    }
    return null;
  }

  get env_config(): ConfigModel {
    return new class implements ConfigModel {
      api_php: string = environment.api_php + "/api";
      api_php_public: string = environment.api_php_public;
      front_end_url: string = environment.front_end_url;
    };
  }

  showLoader() {
    this.is_loading = true;
  }

  hideLoader() {
    this.is_loading = false;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  humanFileSize(size) {
    if (size < 1024) return size + ' B'
    let i = Math.floor(Math.log(size) / Math.log(1024))
    let num:any = (size / Math.pow(1024, i))
    let round = Math.round(num)
    num = round < 10 ? num.toFixed(2) : round < 100 ? num.toFixed(1) : round
    return `${num} ${'KMGTPEZY'[i-1]}B`
}
}
