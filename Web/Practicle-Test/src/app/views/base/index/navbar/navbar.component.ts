import { TranslateService } from "./../../../../shared/services/translate.service";
import { Component, OnInit, VERSION } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./../../../../shared/services/auth.service";
import { ProductService } from "./../../../../shared/services/product.service";
import { UserDetails } from '../../../../shared/models/user';

import { ThemeService } from "src/app/shared/services/theme.service";
declare var $: any;

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  angularVersion = VERSION;
  currentUser: UserDetails;
  jwt_token:string;
  role:string;
  is_Loginhide:boolean;

  
  colorPallet1 = [
    {
      title: "Purple Theme",
      color: "color-purple",
      id: "purple-theme",
    },
    {
      title: "Blue Theme",
      color: "color-blue",
      id: "blue-theme",
    },
  ];

  colorPallet2 = [
    {
      title: "Red Theme",
      color: "color-red",
      id: "red-theme",
    },
    {
      title: "Violet Theme",
      color: "color-violet",
      id: "violet-theme",
    },
  ];
  languageList = [
    { language: "English", langCode: "en" },
    { language: "French", langCode: "fr" },
    { language: "Persian", langCode: "fa" },
    { language: "Japanese", langCode: "ja" },
    { language: "Hindi", langCode: "hin" },
  ];

  constructor(
     public authService: AuthService,
    private router: Router,
    public productService: ProductService,
    public translate: TranslateService,
    private themeService: ThemeService
  ) {
    // console.log(translate.data);
  }

  ngOnInit():void {
    //this.authService.currentUserSubject.subscribe(data => this.currentUser = data);
    this.jwt_token = localStorage.getItem('JWT_TOKEN');
    this.role = localStorage.getItem('ROLE');
debugger
    if(this.jwt_token)
      this.is_Loginhide = true;
    else  
      this.is_Loginhide = false  

  }
  logout() {
    // this.authService.logout();
    this.router.navigate(["/"]);
  }

  LogOutClick() {
    debugger
    //this.authService.logout();
    if (this.jwt_token == null)
    {
      this.router.navigate(['/']);
      this.is_Loginhide = true;
    }
    else
    {
      localStorage.removeItem('JWT_TOKEN');
      localStorage.removeItem('ROLE');
      this.is_Loginhide = true;
      this.router.navigate(['/login']);
     
    }

  }

  setLang(lang: string) {
    // console.log("Language", lang);
    this.translate.use(lang).then(() => {});
  }

  updateTheme(theme: string) {
    this.themeService.updateThemeUrl(theme);
  }
}
