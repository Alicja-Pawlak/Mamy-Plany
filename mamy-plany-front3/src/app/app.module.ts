import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {firebaseConfig} from '../environments/environment';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BooksFormComponent } from './books-form/books-form.component';
import { BooksComponent } from './books/books.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LearnFormComponent } from './learn-form/learn-form.component';
import { LearnComponent } from './learn/learn.component';
// import { SavingsFormComponent } from './savings-form/savings-form.component';
// import { SavingsComponent } from './savings/savings.component';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
// import { SavingsWrapComponent } from './savings/savings-wrap/savings-wrap.component';
import { SavingsFormWrapComponent } from './savings/savings-form-wrap/savings-form-wrap.component';
import { SavingsExpensesComponent } from './savings/savings-expenses/savings-expenses.component';
import { SavingsRevenueComponent } from './savings/savings-revenue/savings-revenue.component';
import { SavingsComponent } from './savings/savings.component';
import { appInitializer } from './helpers/app-initializer';
import { AuthService } from './services/auth.service';



@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    SavingsComponent,
    BooksComponent,
    BooksFormComponent,
    LearnComponent,
    LearnFormComponent,
    HomePageComponent,
    IntroPageComponent,
    CalendarFormComponent,
    SavingsFormWrapComponent,
    SavingsExpensesComponent,
    SavingsRevenueComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
