import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  isContentReady = false;

  ngOnInit() {
    setTimeout(() => {
      this.isContentReady = true;
    }, 3000);
  }
}
