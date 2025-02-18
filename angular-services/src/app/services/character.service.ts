import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Character } from '../models';
import { characterAdapter } from '../adapters';
// el unico lugar de la verdad
@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  state = signal({
    characters: new Map<number, Character>()
  })

  constructor() {
    this.getCharacters()
  }

  getFormattedCharacters() {
    return Array.from(this.state().characters.values())
  }

  getCharactersById(id: number){
    return this.state().characters.get(id)
  }

  getCharacters(): void {
    const mockCharacters: Character[] = [
      {id: 1, name: "Jose", lastName: "Lami", age: 30},
      {id: 2, name: "Sam", lastName: "Sing", age: 25},
      {id: 3, name: "Carlos", lastName: "Boler", age: 21},
      {id: 4, name: "Kami", lastName: "Son", age: 35},
    ]
    of(mockCharacters)
    .subscribe(result => {
      result.forEach(character => this.state().characters.set(character.id, character))
      this.state.set({characters: this.state().characters})
    })
  }

  updateCharacter(character: Character): void {
    const updateCharacter = {... character}

    of(updateCharacter).subscribe((result => {
      this.state.update((state) => {
        state.characters.set(result.id, result)
        return{
          characters: state.characters
        }
      })
    }))
    // cuando los datos los cambian mas personas 
    this.getCharacters()
  }

  deleteCharacter(id: number): void {
    of({status: 200})
    .subscribe(()=> {
      this.state.update((state)=> {
        state.characters.delete(id)
        return {characters: state.characters}
      })
    })
  }

  // constructor() { }
}

/* 
@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = "https://api.example.com/characters";
  private http = inject(HttpClient)

  // getCharacters(): Observable<Character[]> {
  //   return this.http.get<Character[]>(this.apiUrl)
  // }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.apiUrl).pipe(map(characters => characterAdapter(characters)))
  }

  updateCharacter(character: Character): Observable<Character> {
    return this.http.put<Character>(`${this.apiUrl}`, character)
  }

  deleteCharacter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  // constructor() { }
}
*/