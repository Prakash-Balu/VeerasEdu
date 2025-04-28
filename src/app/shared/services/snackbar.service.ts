import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  Success(message: string = 'success') {
    console.log('message::', message);
    this.showMessage(message, 'Dismiss', 3000, 'success-snackbar');
  }

  Error(message: string) {
    this.showMessage(message, 'Dismiss', 3000, 'error-snackbar');
  }

  showMessage(
    message: string,
    action: string = 'Close',
    duration: number = 3000,
    panelClass: string = ''
  ) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: panelClass ? [panelClass] : [],
    });
  }
}
