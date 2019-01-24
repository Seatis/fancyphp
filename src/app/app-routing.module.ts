import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { NamesComponent } from './names/names.component';

const APP_ROUTING : Routes = [
  { path: '', component: DefaultComponent },
  { path: 'names', component: NamesComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTING);
