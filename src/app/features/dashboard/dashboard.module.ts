import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { components } from './components';
import { containers } from './containers';
import { services } from './services';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [...components, ...containers],
  imports: [
    CommonModule,
    DashboardRoutingModule,
  ],
  providers: [...services]
})
export class DashboardModule { }
