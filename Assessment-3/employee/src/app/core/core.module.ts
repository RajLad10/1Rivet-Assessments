import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { TopbarComponent } from './components/topbar/topbar.component';


@NgModule({
  declarations: [
    TopbarComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [
    TopbarComponent,
  ]
})
export class CoreModule { }
