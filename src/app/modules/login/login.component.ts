import {
  Component,
  OnInit,
  OnDestroy,
  Renderer2,
  HostBinding
} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from "@services/api.service";
import {Router} from "@angular/router";
import {AuthService} from "@services/auth.service";
import {ErrorService} from "@services/error.service";
import {GlobalService} from "@services/global.service";
import {UserModel} from "@/model/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'login-box';
  public loginForm: FormGroup;
  public isAuthLoading = false;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private api: ApiService,
    private router: Router,
    private authService: AuthService,
    private errorHandler: ErrorService,
    public globalService: GlobalService
  ) {
  }

  ngOnInit() {
    this.renderer.addClass(
      document.querySelector('app-root'),
      'login-page'
    );
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  start_loading() {
    this.isAuthLoading = true;
    //this.globalService.is_loading = true;
  }
  get f() {
    return this.loginForm.controls;
  }
  stop_loading() {
    this.isAuthLoading = false;
    //this.globalService.is_loading = false;
  }

  async loginByAuth() {
    if (this.loginForm.valid) {
      this.start_loading();
      this.authService.checkLogin({...this.loginForm.value}).subscribe((result: any) => {
        this.stop_loading();
        if (result.status) {
          if (result.message) {
            this.toastr.success(result.message);
          }
          this.globalService.setUser = result.data.user;
          localStorage.setItem('token', result.data.token);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorHandler.basicHandler(result);
        }
      }, (result: any) => {
        this.errorHandler.criticalHandler(result);
        this.stop_loading();
      });

    } else {
      this.toastr.error('Form is not valid!');
      this.stop_loading();
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(
      document.querySelector('app-root'),
      'login-page'
    );
  }
}
