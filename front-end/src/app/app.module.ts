import { BrowserModule } from
	'@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FileUploadComponent } from
	'./file-upload/file-upload.component';

import { AppComponent } from './app.component';
import {HttpClientModule} from
	'@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
 

@NgModule({
declarations: [
	AppComponent,
	FileUploadComponent,
	CanvasJSChart

 
],
imports: [
	BrowserModule,
	HttpClientModule,
 BrowserAnimationsModule,FormsModule, NgbModule
 
],
providers: [],
bootstrap: [AppComponent]
})
export class AppModule { }
