import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiList } from '../modal/interface/card';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-practice-master',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './practice-master.component.html',
  styleUrl: './practice-master.component.css',
})
export class PracticeMasterComponent implements OnInit {
  apiCard: ApiList[] = [];

  http = inject(HttpClient);

  constructor(private router: Router) {}
  // getVideoApi() {
  //   this.authService.apiVideoSegment().subscribe((resp) => {
  //     if (resp) {
  //       this.router.navigate(['/practice-master']);
  //     }
  //   });
  // }
  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  ngOnInit(): void {
    this.storeApiValue();
    // this.getVideoApi();
  }
  storeApiValue() {
    this.http
      .get(environment.baseURL + '/practicewithmasterCustomer/listPractices', {
        headers: this.getHeaders(),
      })
      .subscribe((res: any) => {
        console.log('card', res);

        this.apiCard = res.data;
      });
  }
  getApi(name: string, _id: any) {
    this.router.navigateByUrl(`practice-master/${name}/${_id}`);
  }
  // card: any[] = [];

  // ngOnInit(): void {
  //   this.card = [
  //     { id: '1', header: 'SEGMENT1', content: 'Pronoun', link: '/segment1' },
  //     { id: '2', header: 'SEGMENT2', content: 'Pronoun', link: '/segment1' },
  //     { id: '3', header: 'SEGMENT3', content: 'Pronoun', link: '/segment1' },
  //     { id: '4', header: 'SEGMENT4', content: 'Pronoun', link: '/segment1' },
  //     { id: '5', header: 'SEGMENT5', content: 'Pronoun', link: '/segment1' },
  //     { id: '6', header: 'SEGMENT6', content: 'Pronoun', link: '/segment1' },
  //     { id: '7', header: 'SEGMENT7', content: 'Pronoun', link: '/segment1' },
  //     { id: '8', header: 'SEGMENT8', content: 'Pronoun', link: '/segment1' },
  //   ];
  // }
}
