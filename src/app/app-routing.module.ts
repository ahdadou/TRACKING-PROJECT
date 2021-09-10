import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { GuardGuard } from './shared/guards/guard.guard';

const routes: Routes = [
{
  path:'acc',
  loadChildren:()=>import('./account/account.module')
                        .then(m => m.AccountModule),
  canActivate:[GuardGuard]
},
{path:'',component:HomeComponent},
{path:'home',component:HomeComponent},
{path:'login',component:LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
