import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-failure',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './payment-failure.component.html',
  styleUrl: './payment-failure.component.css'
})
export class PaymentFailureComponent {
  constructor(private router: Router) {}

  retryPayment() {
    this.router.navigate(['/']); // Replace '/retry-payment' with your retry route
  }

}
