import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from "./Components/main/main.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from "./Components/home/home.component";
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NgModel } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxStripeModule } from 'ngx-stripe';

import { NgModule } from '@angular/core'; 
import { FormsModule } from '@angular/forms'; 
import { PaymentFormComponent } from './Components/payment-form/payment-form.component';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, FontAwesomeModule, HomeComponent, RouterModule, RouterLink, HttpClientModule,FormsModule,NgxStripeModule ],

  templateUrl: './app.component.html',
  
  styleUrl: './app.component.css'
})

export class AppComponent {

}
