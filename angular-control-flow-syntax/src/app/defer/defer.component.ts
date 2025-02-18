import { Component } from '@angular/core';

@Component({
  selector: 'app-defer',
  imports: [],
  templateUrl: './defer.component.html',
  styleUrl: './defer.component.scss',
})
export class DeferComponent {
  // permite cargar contenido de forma diferida, segun una condicion
  // mejora rendimiento, aplica lazy loading ya que retrasa la carga de partes no criticas
  isImageVisible = false;
  showImage() {
    this.isImageVisible = true;
  }
}
