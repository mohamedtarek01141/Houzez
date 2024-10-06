import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { StripeFactoryService, StripeInstance } from "ngx-stripe";
import { switchMap } from "rxjs";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NgxStripeModule } from 'ngx-stripe'; // Import the Stripe module
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink,NgxStripeModule],
  templateUrl: './payment-form.component.html',
  
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  isLoading = false;
  paymentStatus: string = '';
  stripe: any; // Stripe instance
  card: any; // Card element

  constructor(private router: Router,private http: HttpClient,private stripeFactory: StripeFactoryService) {}

  ngOnInit() {
    // Initialize Stripe.js
 //   this.stripe=
   // this.stripeFactory.create("pk_test_51Q66Lr2LJTCao3Ztd0jg6xGWMe9h3O7Rvqw4TKtO4EdbnHq3QGfWKiMX54kggR7fcyHOx5isfsWn4Kaw1Q2z6gxK00a0d8KXWz");
    // Create an instance of Elements
    const elements = this.stripe.elements();

    // Create a card element
    this.card = elements.create('card');
    this.card.mount('#card-element'); // Mounts the card element to the div
  }

  async onSubmit(paymentForm: NgForm) {
    if (paymentForm.valid) {
      this.isLoading = true;
      this.paymentStatus = '';

      // Create a Payment Method with the card information
      try {
        const { error, paymentMethod } = await this.stripe.createPaymentMethod({
          type: 'card',
          card: this.card,
        });

        if (error) {
          this.isLoading = false;
          this.paymentStatus = `Payment failed: ${error.message}`;
        } else {
          this.isLoading = false;
          this.paymentStatus = 'Payment Successful!';
          console.log('Payment Method ID:', paymentMethod.id); // Log or send this ID to your backend for processing

          // Here you can also call your backend API to complete the payment using this payment method ID
          // await this.paymentService.processPayment(paymentMethod.id);

          this.router.navigate(['/dashboard']);
        }
      } catch (error) {
        this.isLoading = false;
        this.paymentStatus = 'Payment failed. Please try again.';
        console.error(error);
      }
    }
  }
}
