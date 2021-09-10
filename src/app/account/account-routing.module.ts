import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxComponent } from './components/inbox/inbox.component';
import { IndexComponent } from './components/index/index.component';
import { MapComponent } from './components/map/map.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RootPageComponent } from './root-page/root-page.component';

const routes: Routes = [
  {
    path:'',component:RootPageComponent,
    children:[
      {path:'',component:IndexComponent},
      {path:'inbox/:id',component:InboxComponent},
      {path:'notifications',component:NotificationComponent},
      {path:'profile/:id',component:ProfileComponent},
      {path:'map',component:MapComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
