import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import  'firebase/compat/auth';
import 'firebase/compat/firestore';
//import { getAuth } from "firebase/auth";
import { BehaviorSubject, concat, exhaustMap, map, Observable, take, tap } from 'rxjs';
import { User } from '../helpers/models/userModel';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject =  new BehaviorSubject<User | null>(null);;
  public currentUser: Observable<User | null>;
  private currentUserObject = new User();
  // private auth = firebase.on
  constructor(public afAuth: AngularFireAuth) {
    this.currentUser = this.currentUserSubject.asObservable();    
  }



  getUser(): Observable<any> {
    return this.afAuth.idToken.pipe(take(1), exhaustMap((token: any) => {
      this.currentUserObject.accesToken = token;
      //this.currentUserSubject.next(this.currentUserObject);
      return this.afAuth.authState.pipe(map((state: any) => {
        if (state) {
          this.currentUserObject.email = state.email;
          this.currentUserObject.uid = state.uid;
          this.currentUserSubject.next(this.currentUserObject);
        }
        
        return state;
      }))
    }))
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
}

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      })
    })
  }

  doRegister(value: any){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value: any) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signOut().then(res => {
        resolve(res);
      }, err => reject(err));
    })
  }

  
 
  
  
  
}
