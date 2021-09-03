import { LoginComponent } from "./login/login.component";
import { Routes } from "@angular/router";
import { IndexComponent } from "./index.component";
import { AuthGuard } from "src/app/shared/guards/auth_gaurd";
import { AdminGaurd } from "src/app/shared/guards/admin-gaurd";

export const IndexRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        canActivate:[AuthGuard, AdminGaurd],
        component: IndexComponent,
      },
      {
        path: "login",
        component: LoginComponent,
      },
    ],
  },
];
