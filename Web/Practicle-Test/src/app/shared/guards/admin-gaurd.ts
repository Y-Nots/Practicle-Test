import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AdminGaurd implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {
    if (localStorage.getItem("Auth_TOKEN")) {
      if (JSON.parse(localStorage.getItem("Auth_TOKEN")).role == 'Admin') {
        return true;
      }
    } else {
      this.router.navigate(["/login"]);
    };
    return true;
  }
}
