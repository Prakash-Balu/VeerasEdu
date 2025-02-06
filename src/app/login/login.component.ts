import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../core/services/auth.service';
import { PusherService } from '../core/services/pusher.service';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, QRCodeModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  qrvalue = 'https://veeraseducation.com';
  faBars = faBars;
  public chanelId: string = '123456';
  public isAuthorize: boolean = false;
  public imageSrc: string =
    'https://veerasapi.onrender.com/images/logo_icon.png';
  private intervalId: any;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private pusherService: PusherService,
    private router: Router // private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // redirect to home if already logged in
    if (this.authService.tokenValue) {
      // this.router.navigate(['/attendence']);
    } else {
      this.getQrCode();
      this.intervalId = setInterval(() => {
        this.getQrCode();
      }, 20000);
    }
  }

  getQrCode() {
    this.authService.getQrCode().subscribe((resp: any) => {
      if (resp.meta.code === 200) {
        this.subscribeChannel(resp.data.hashedData);
        this.chanelId = JSON.stringify(resp.data);
      } else {
        alert('generate QR code issue');
      }
    });
  }

  recordSession() {
    this.authService.recordSession().subscribe(
      (resp: any) => {
        if (resp.meta.code === 200) {
          console.log('resp::', resp);
        }
      },
      (err) => console.log('reord::', err)
    );
  }

  subscribeChannel(chanelId: string) {
    this.pusherService.subscribe(chanelId, 'login-event', (data: any) => {
      if (data.token) {
        this.authService.setToken(data.token);
        this.authService.userMeApi().subscribe((resp) => {
          if (resp) {
            this.router.navigate(['/attendence']);
          }
        });
      } else {
        this.getQrCode();
        this.intervalId = setInterval(() => {
          this.getQrCode();
        }, 20000);
      }
    });

    this.pusherService.subscribe(chanelId, 'authorize-event', (data: any) => {
      if (data.message) {
        this.isAuthorize = true;
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
      }
    });

    this.pusherService.subscribe(chanelId, 'denied-event', (data: any) => {
      if (data.message) {
        this.getQrCode();
        this.intervalId = setInterval(() => {
          this.getQrCode();
        }, 20000);
        this.isAuthorize = false;
      }
    });
  }
}
