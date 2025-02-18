import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-if',
  imports: [NgIf],
  templateUrl: './if.component.html',
  // template: `
  // <div><h3>angular</h3></div>
  // `,
  styleUrl: './if.component.scss'
})
export class IfComponent {
  isVisible = true //publica en html
  protected esVisible = true // accesible desde de su clase y subclases
  private esVisibleP = true // solo en esta clase, el template no puede acceder
}
