// ng g component for // crear carpeta for con sus archivos
import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-for',
  imports: [NgFor],
  templateUrl: './for.component.html',
  styleUrl: './for.component.scss',
})
export class ForComponent {
  names: string[] = ['Sergi', 'Sam', 'David', 'Carlos', 'Jose'];
}
