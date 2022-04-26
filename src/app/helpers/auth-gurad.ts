// import { Injectable } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { AuthService } from '../services/auth.service';


// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//     constructor(
//         private router: Router,
//         private authenticationService: AuthService,
//     ) { }

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
//         const currentUser = this.authenticationService.currentUserValue;
//         if (currentUser ) {
//             console.log(currentUser)
//             return true;
//         }
//         else {
//           if(currentUser == null){
//             this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
//           }
//           else{
//             this.router.navigate(['']);
//           }
//           return false;
//         }
//     }

// }
