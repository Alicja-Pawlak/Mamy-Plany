import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  message!:string;
  registerForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  tryRegister(value: any){
    if (this.registerForm.valid) {
      this.authService.doRegister(value)
      .then(res => {
        console.log(res);
        //this.errorMessage = "";
        this.router.navigate(["/"])
      }, err => {
        console.log(err);
      //   if(err.message == "Firebase: The email address is badly formatted. (auth/invalid-email).")
      //   {
      //     this.message = "Niepoprawny format adresu e-mail."
      //   }
      //  else if(err.message == "Firebase: Password should be at least 6 characters (auth/weak-password).")
      //  {
      //    this.message = "Hasło musi zawierać conajmniej 6 znaków."
      //  };
        alert("Wystąpił problem podczas połączenia");
        //this.successMessage = "";
      })
    }
  }

  

  ngOnInit(): void {
  }

}
