import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NamesComponent } from './names/names.component';
import { routing } from './app-routing.module';
import { NameService } from './name.service';
import { HeaderComponent } from './header/header.component';

import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DialogModule} from 'primeng/dialog';

import { DefaultComponent } from './default/default.component';



@NgModule({
  declarations: [
    AppComponent,
    NamesComponent,
    HeaderComponent,
    DefaultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    ProgressSpinnerModule,
    DialogModule,
    BrowserAnimationsModule
  ],
  providers: [NameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
