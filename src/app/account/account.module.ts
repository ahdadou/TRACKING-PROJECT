import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { BarRatingModule } from 'ngx-bar-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InboxComponent } from './components/inbox/inbox.component';
import { RootPageComponent } from './root-page/root-page.component';
import { IndexComponent } from './components/index/index.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TokenInterceptorService } from '../shared/interceptors/token-interceptor.service';
import { HttpClientModule } from '@angular/common/http';
import { EllipsisPipe } from './shared/pipes/ellipsis.pipe';
import { MapComponent } from './components/map/map.component';
import { NavComponent } from './components/nav/nav.component';
import { OrderBy } from './shared/pipes/sortedBy.pipe';
import { DiffDate } from './shared/pipes/diffDate';
import { MessageComponent } from './components/message/message.component';


@NgModule({
  declarations: [
    InboxComponent,
    ProfileComponent,
    NotificationComponent,
    IndexComponent,
    RootPageComponent,
    NavComponent,
    EllipsisPipe,
    MapComponent,
    OrderBy,
    DiffDate,
    MessageComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    BarRatingModule,
    FormsModule,
    ReactiveFormsModule,
    
    
  ],
  providers:[
  ]
})
export class AccountModule { }
