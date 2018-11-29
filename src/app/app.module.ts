import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SimpleNotificationsModule } from 'angular2-notifications';


import { AppComponent } from './app.component';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatToolbarModule,
  // MatSelectModule,
  // MatMenuModule
} from '@angular/material';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { FewActionsComponent } from './components/few-actions/few-actions.component';
import { ManyActionsComponent } from './components/many-actions/many-actions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const modules = [
  BrowserModule,
  BrowserAnimationsModule,
  SimpleNotificationsModule.forRoot(),
  NgxJsonViewerModule,

  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatToolbarModule,

  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [
    AppComponent,
    FewActionsComponent,
    ManyActionsComponent
  ],
  imports: [

    ...modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
