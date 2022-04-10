import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DsaService } from '@services/dsa.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-ytd',
  templateUrl: './ytd.component.html',
  styleUrls: ['./ytd.component.scss'],
  providers:[DsaService]
})
export class YtdComponent implements OnInit {
  batches: any =[];
  loading:boolean=false;
  constructor(private dsaService:DsaService,private toastr: ToastrService,) { }

  public form : FormGroup;

  ngOnInit(): void {
    this.form=new FormGroup({
      fileInput: new FormControl(null, Validators.required),
      file: new FormControl(null, Validators.nullValidator),
    })
  }

  get f() {
    return this.form.controls;
  }

  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        file: file
      });
    }
  }

  submit() {
    if (this.form.valid) {
      this.loading=true;
      let formData:any = new FormData();
      formData.append('file',this.f["file"].value);
      this.dsaService.ytdUpload(formData).subscribe((res)=>{
        if(res.status) {
          let data = res.data;
          this.batches= data;
          this.toastr.success(res.message);
          this.form.reset();
        }
        else {
          this.toastr.error(res.message);
        }
        this.loading=false;
      },(err)=>{
        this.toastr.error(err);
        this.loading=false;
      })
    }
    else {
      this.toastr.error('Please select file');
    } 
  }

}
