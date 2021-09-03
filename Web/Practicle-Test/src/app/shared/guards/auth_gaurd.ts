import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Router, CanActivate, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // return this.authService.isLoggedIn$.pipe(
    //   tap((allowed) => {
    //     if (!allowed) {
    //       this.router.navigate(["/login"], {
    //         queryParams: { returnUrl: state.url },
    //       });
    //     }
    //   })
    // );
    if(state.url=="/product"){
      
    }
    debugger
    if (localStorage.getItem("Auth_TOKEN")) {
      return true;
    } else {
      this.router.navigate(["/login"]);
    };
  }
}
