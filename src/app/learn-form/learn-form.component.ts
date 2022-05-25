import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LearnService } from '../services/learn.service';

@Component({
  selector: 'app-learn-form',
  templateUrl: './learn-form.component.html',
  styleUrls: ['./learn-form.component.scss']
})
export class LearnFormComponent implements OnInit {
  learnForm: FormGroup;

  id: string;
  isAddMode: boolean;

  constructor(private fb: FormBuilder, private learnService: LearnService, private router: Router, private route: ActivatedRoute) { 
    this.learnForm = new FormGroup({
      'topic' : new FormControl(null, Validators.required),
      'subject' : new FormControl(null, Validators.required),
      'endDate' : new FormControl((new Date()).toISOString().substring(0,10), [Validators.required]),
     },
     );
     
  }

  onSubmit(value: any) {
    console.log('mode', this.isAddMode)
    if (this.learnForm.valid) {
      if (this.isAddMode) {
        this.createLearn(value);
      } else {
        this.updateLearn(value);
      }
    }
    
  }

  createLearn(value: any){
    this.learnService.createLearn(value);
    this.router.navigate(["/learn"]);
  }

  updateLearn(value: any) {
    this.learnService.updateLearn(value, this.id);
    this.router.navigate(["/learn"]);
}

  ngOnInit(): void {   
    //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
  }
}

