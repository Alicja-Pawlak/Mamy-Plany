import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LearnService } from '../services/learn.service';

@Component({
  selector: 'app-learn-form',
  templateUrl: './learn-form.component.html',
  styleUrls: ['./learn-form.component.scss']
})
export class LearnFormComponent implements OnInit {
  learnForm: FormGroup;

  constructor(private fb: FormBuilder, private learnService: LearnService, private router: Router) { 
    this.learnForm = new FormGroup({
      'topic' : new FormControl(null, Validators.required),
      'subject' : new FormControl(null, Validators.required),
      'endDate' : new FormControl((new Date()).toISOString().substring(0,10), [Validators.required]),
     }, 
     );
     
  }

  createLearn(value: any){
    if (this.learnForm.valid) {
      console.log('dfkdfk')
      this.learnService.createLearn(value);
      this.router.navigate(["/learn"]);  
    }
  }

  ngOnInit(): void {   
    //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
}

