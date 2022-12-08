import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
// import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  subs: any = new SubSink();

  constructor(private router: Router, private authService: AuthService) { }
  formLogin: FormGroup = new FormGroup({
    email: new FormControl("", Validators.email),
    password: new FormControl("", Validators.required)
  })

  data: any = this.formLogin.value;

  ngOnInit(): void {
    // console.log(this.data)
  }

  payload: any;
  onSubmit() {
    this.data = this.formLogin.value;
    this.payload = this.formLogin.value;
    console.log(this.data);
    this.subs.sink = this.authService.loginUser(this.payload.email, this.payload.password).subscribe(resp => {
      console.log(resp);
      if (resp) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate([''])
      }
    })
    this.formLogin.controls['email'].setValue('');
    this.formLogin.controls['password'].setValue('');

  }





}
