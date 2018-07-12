import { NgRelaxModule } from './../../ng-relax/ng-relax.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import { RoleComponent } from './role/role.component';
import { LoginLogComponent } from './login-log/login-log.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    NgRelaxModule
  ],
  declarations: [AccountComponent, RoleComponent, LoginLogComponent]
})
export class AccountModule { }
