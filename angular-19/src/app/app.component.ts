import { Component, input } from '@angular/core';
import { HydrateComponent } from './hydrate/hydrate.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HydrateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-19';
  readonly test = input(false);
}
