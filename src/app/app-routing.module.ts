import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
//import { AuthGuard } from './helpers/auth-gurad';
import { AngularFireAuthGuard,redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BooksFormComponent } from './books-form/books-form.component';
import { BooksComponent } from './books/books.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LearnFormComponent } from './learn-form/learn-form.component';
import { LearnComponent } from './learn/learn.component';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { CalendarFormComponent } from './calendar-form/calendar-form.component'; 
import { SavingsFormWrapComponent} from './savings/savings-form-wrap/savings-form-wrap.component'
import { SavingsComponent } from './savings/savings.component';
import { CalendarResolver } from './helpers/resolvers/calendar.-resolver';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {path: "register", component: RegisterComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome }},
  {path: "login", component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome }},
  {path: "", component: HomePageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }, children: [
    {path: "", component: IntroPageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
    {path: "calendar", component: CalendarComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }, resolve: {events: CalendarResolver}},
    {path: "calendar/form", component: CalendarFormComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
    {path: "savings", component: SavingsComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
    {path: "savings/form", component: SavingsFormWrapComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
    {path: "books", component: BooksComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
    {path: "books/form", component: BooksFormComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
    {path: "books/form/:id", component: BooksFormComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
    {path: "learn", component: LearnComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
    {path: "learn/form", component: LearnFormComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
    {path: "learn/form/:id", component: LearnFormComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
