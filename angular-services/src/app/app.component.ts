import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterService } from './services';
import { Character } from './models';
// import { Observable } from 'rxjs';
// import { AsyncPipe } from '@angular/common';
import { toSignal } from "@angular/core/rxjs-interop"

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // 1 parametros de entrada
  // 2 cambios de interacción del usuario
  // 3 cambios por llamadas async
})
export class AppComponent {
  title = 'angular-services';

  characterService = inject(CharacterService)
  characters: Signal<Character[] | undefined> = computed(()=> 
    this.characterService.getFormattedCharacters()
  )
} 

/* 
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    // AsyncPipe
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-services';

  characterService = inject(CharacterService)
  characters: Signal<Character[] | undefined> = toSignal(this.characterService.getCharacters())

  // characterService = inject(CharacterService)
  // characters: Character[] = [] as Character[]

  // constructor() {
  //   this.characterService
  //   .getCharacters()
  //   .subscribe(chars => {
  //     this.characters = chars
  //   })
  // }

  // characterService = inject(CharacterService)
  // characters$: Observable<Character[]> = this.characterService.getCharacters()
} 
*/
