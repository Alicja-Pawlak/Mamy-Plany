import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.scss']
})
export class BooksFormComponent implements OnInit {
  bookForm: FormGroup;

  id: string;
  isAddMode: boolean;

  constructor(private fb: FormBuilder, private bookService: BooksService, private router: Router, private route: ActivatedRoute) { 
    this.bookForm = new FormGroup({
      'title' : new FormControl(null, Validators.required),
      'author' : new FormControl(null, Validators.required),
      'borrowDate' : new FormControl((new Date()).toISOString().substring(0,10), [Validators.required]),
      'returnDate' : new FormControl((new Date()).toISOString().substring(0,10), [Validators.required]),
     }, 
     { validators: this.dateConditionallyRequiredValidator}
     );
     
  }

  dateConditionallyRequiredValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const borrowDate = control.get('borrowDate');
    const returnDate = control.get('returnDate');

    return borrowDate && returnDate && borrowDate.value > returnDate.value ? { invalidDate: true } : null;
  };

  onSubmit(value: any) {
    console.log('mode', this.isAddMode)
    if (this.bookForm.valid) {
      if (this.isAddMode) {
        this.createBook(value);
      } else {
        this.updateBook(value);
      }
    }
    
  }

  createBook(value: any){
      this.bookService.createBook(value);
      this.router.navigate(["/books"]);
  }

  updateBook(value: any) {
      this.bookService.updateBook(value, this.id);
      this.router.navigate(["/books"]);
  }


  ngOnInit(): void {   
    //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
  }
}
