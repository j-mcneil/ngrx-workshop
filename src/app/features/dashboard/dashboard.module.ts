import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { components } from './components';
import { containers } from './containers';
import { services } from './services';
import { effects, reducers } from './store';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [...components, ...containers],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StoreModule.forFeature('dashboard', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [...services]
})
export class DashboardModule { }
