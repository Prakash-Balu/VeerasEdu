import { Component, Input } from '@angular/core';
import { routes } from '../../shared/routes/routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})

/**
 * Bread Crumbs Component
 */
export class BreadcrumbsComponent {
routes = routes
  @Input() title: string | undefined;
  @Input()
  breadcrumbItems!: {
    active?: boolean;
    label?: string;
  }[];

  Item!: {
    label?: string;
  }[];




}
