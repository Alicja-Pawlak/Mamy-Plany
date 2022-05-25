import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LearnService } from '../services/learn.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {

  constructor(private learnService:LearnService, private router: Router) { }

  learnList: any = {};

  learn: any[] = [];

  ngOnInit(): void {
    this.learnService.getLearn().subscribe((resp: any) => {
      this.learnList = resp;
      if (this.learnList) {
        this.populateLearn();
      }
      })
  }

  populateLearn() : void {
    this.learn = [];
    for (const learn of Object.keys(this.learnList) ) {
      this.learn.push({
          topic: this.learnList[learn].topic,
          subject: this.learnList[learn].subject,
          endDate: this.learnList[learn].endDate,
          id: learn
        },
      )
      // Filtrowanie książek
      this.learn = this.learn.filter(x=>x.topic != undefined)
    }
  }

  removeLearn(id: any) {
    this.learnService.removeLearn(id);
  }
}