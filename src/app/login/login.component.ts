import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  message!:string;
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required)
  })

  tryLogin(value: any){
    if (this.loginForm.valid) {
      this.authService.doLogin(value)
    .then(res => {
      this.router.navigate([''])
    }, err => {
      this.message = "Nieprawidłowe hasło lub email"
    })
    }
  }
  

  ngOnInit(): void {
  }
}
