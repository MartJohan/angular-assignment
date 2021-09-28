import { NgModule } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { CatalogueComponent } from "./components/catalogue/catalogue.component";
import { LoginComponent } from "./components/login/login.component";
import { TrainerComponent } from "./components/trainer/trainer.component";

const routes = [
    {
        path : '',
        pathMatch : 'full',
        redirectTo : '/login'
    },
    {
        path : 'catalogue',
        component : CatalogueComponent
    },
    {
        path : 'login',
        component : LoginComponent
    },
    {
        path : 'trainer',
        component : TrainerComponent
    }
];

@NgModule({
    imports : [ RouterModule.forRoot(routes) ],
    exports : [ RouterModule ]
})

export class AppRoutingModule {}