import {
  Component,
  OnInit,
  Renderer2,
  OnDestroy,
  HostBinding
} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from "@services/auth.service";
import {ErrorService} from "@services/error.service";
import {GlobalService} from "@services/global.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'register-box';

  public registerForm: FormGroup;
  public isAuthLoading = false;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private authService: AuthService,
    private errorHandler: ErrorService,
    private globalService: GlobalService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.renderer.addClass(
      document.querySelector('app-root'),
      'register-page'
    );
    this.registerForm = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required]),
      retypePassword: new FormControl(null, [Validators.required])
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  async registerUser() {
    if (this.registerForm.valid) {
      this.isAuthLoading = true;
      this.authService.registerUser({...this.registerForm.value}).subscribe((result: any) => {
        if (result.status) {
          if (result.message) {
            this.toastr.success(result.message);
          }
          this.globalService.setUser = result.data.user;
          localStorage.setItem('token', result.data.token);
          this.router.navigate(['/']);
        } else {
          this.errorHandler.basicHandler(result);
        }
      }, (result: any) => {
        this.errorHandler.criticalHandler(result);
      });
      this.isAuthLoading = false;
    } else {
      this.toastr.error('Some fields are ');
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(
      document.querySelector('app-root'),
      'register-page'
    );
  }
}
