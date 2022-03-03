import {Injectable} from '@angular/core';
import {UserModel} from '@/model/User';
import {ConfigModel} from "@/model/Config";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {ApiService} from "@services/api.service";
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(private toastr: ToastrService) {
  }

  basicHandler(result: any) {
    if (result.type == "error") {
      this.toastr.error(result.message);
    } else {
      if (result.message.length) {
        for (let msg of result.message) {
          this.toastr.warning(msg);
        }
      }
    }
  }

  criticalHandler(result: any) {
    // Handlers the laravel validation
    if (result.status == 422) {
      let result_data = Object.keys(result.error.errors).map((key) => [result.error.errors[key]]);
      for (var msg of result_data) {
        this.toastr.warning(msg.toString());
      }
    } else {
      if (result.type == "error") {
        this.toastr.error(result.message);
      } else {
        if (result.message.length) {
          for (let msg of result.message) {
            this.toastr.warning(msg);
          }
        }
      }
    }
  }
}
