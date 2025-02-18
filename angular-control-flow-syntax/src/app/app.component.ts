import { Component } from '@angular/core';
import { AdvancedDeferComponent } from './advanced-defer/advanced-defer.component';
import { ErrorComponent } from './error/error.component';

@Component({
  selector: 'app-root',
  imports: [AdvancedDeferComponent, ErrorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-control-flow-syntax';
}
