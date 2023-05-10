import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SearchPipe } from './pipes/search.pipe';
import { ShortenPipe } from './pipes/shorten.pipe';
import { StatusColourPipe } from './pipes/status-colour.pipe';


@NgModule({
  declarations: [
    SearchPipe,
    ShortenPipe,
    StatusColourPipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
