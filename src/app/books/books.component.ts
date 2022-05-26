import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  constructor(private bookService: BooksService, private router: Router) { }

  booksList: any = {};

  books: any[] = [];

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((resp: any) => {
      this.booksList = resp;
      if (this.booksList) {
        this.populateBooks();
      }
      })
  }

  populateBooks() : void {
    this.books = [];
    for (const book of Object.keys(this.booksList) ) {
      this.books.push({
          title: this.booksList[book].title ,
          author:  this.booksList[book].author,
          borrowDate: this.booksList[book].borrowDate,
          returnDate: this.booksList[book].returnDate,
          id: book
        },
      )
      // Filtrowanie książek
      this.books = this.books.filter(x=>x.author != undefined)
    }
  }

  removeBook(id: any) {
    this.bookService.removeBook(id);
  }
}