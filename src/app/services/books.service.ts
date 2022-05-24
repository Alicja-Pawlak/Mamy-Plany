import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private books:any = {};
  private books$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.http.get(`${environment.apiUrl}/Books/${this.authService.currentUserValue?.uid}.json`).subscribe(books => {
      books ? this.books = books : {};
      this.books$.next(this.books);
    })
  }

  createBook(book: any) {
    this.http.post(`${environment.apiUrl}/Books/${this.authService.currentUserValue?.uid}.json`, book).subscribe((resBook: any) => {
      let key = resBook.name;
      this.books[key] = {
          borrowDate: book.borrowDate,
          returnDate: book.returnDate,
          author: book.author,
          title: book.title
      };
      this.books$.next(this.books);
      
    });
  }

  updateBook(book: any, id: string) {
    this.http.patch(`${environment.apiUrl}/Books/${this.authService.currentUserValue?.uid}/${id}.json`, book).subscribe((resp: any) => {
      this.books[id] = {
          borrowDate: book.borrowDate,
          returnDate: book.returnDate,
          author: book.author,
          title: book.title
      };
      this.books$.next(this.books);
    })
  }

  removeBook(id: any) {
    this.http.delete(`${environment.apiUrl}/Books/${this.authService.currentUserValue?.uid}/${id}.json`).subscribe((resp: any) => {
      delete this.books[id];
      this.books$.next(this.books);
    })
  }

  getBooks() {
    return this.books$.asObservable();
  }
}
