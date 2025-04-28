import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css',
})
export class PaymentSuccessComponent {
  constructor(private router: Router) {}

  goToDashboard() {
    this.router.navigate(['/login']); // Replace '/dashboard' with your target route
  }
}
