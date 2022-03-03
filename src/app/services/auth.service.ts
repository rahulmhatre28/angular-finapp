import {Injectable} from '@angular/core';
import {UserModel} from '@/model/User';
import {ConfigModel} from "@/model/Config";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {ApiService} from "@services/api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,private apiService:ApiService) {
  }

  checkLogin(req: any) {
    return this.apiService.get('/login', req);
  }

  registerUser(req: any) {
    return this.apiService.post('/register', req);
  }

  setDisplayUnauthorized(status: any) {

  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
 }
