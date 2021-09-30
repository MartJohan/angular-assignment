import { NgModule } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { CatalogueComponent } from "./components/catalogue/catalogue.component";
import { LoginComponent } from "./components/login/login.component";
import { TrainerComponent } from "./components/trainer/trainer.component";
import { AuthGuardGuard } from "./services/auth-guard.guard";

const routes = [
    {
        path : '',
        pathMatch : 'full',
        redirectTo : '/login'
    },
    {
        path : 'catalogue',
        component : CatalogueComponent,
        canActivate : [ AuthGuardGuard ]
    },
    {
        path : 'login',
        component : LoginComponent
    },
    {
        path : 'trainer',
        component : TrainerComponent,
        canActivate : [ AuthGuardGuard ]
    }
];

@NgModule({
    imports : [ RouterModule.forRoot(routes) ],
    exports : [ RouterModule ]
})

export class AppRoutingModule {}