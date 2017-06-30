import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { LoginGroupComponent } from './login-group/login-group.component';
import { TopPageComponent } from './top-page/top-page.component';
import { TopAdminComponent } from './top-admin/top-admin.component';
import { SettingComponent } from './setting/setting.component';
import { UsersettingComponent } from './usersetting/usersetting.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { UserlistComponent } from './userlist/userlist.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    LoginGroupComponent,
    TopPageComponent,
    TopAdminComponent,
    SettingComponent,
    UsersettingComponent,
    CreateuserComponent,
    UserlistComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
