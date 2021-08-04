import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  httpOptions = 
  {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }
  private handleError<T>(operation = 'operation', result?: T)
  {
    return (error: any): Observable<T> =>
    {
      console.error(error)

      this.log(`${operation} failed: ${error.message}`)

      return of(result as T)
    }
  }
  private heroesUrl = 'http://localhost:3000/heroes'
  constructor(private messageService: MessageService, private http: HttpClient) { }
  getHeroes(): Observable<Hero[]>
  {
    /*
    const heroes = of(HEROES)
    this.messageService.add('HeroService: fetched heroes')
    return heroes;
    */
   return this.http.get<Hero[]>(this.heroesUrl).pipe(tap(_ => this.log('fetched heroes')),catchError(this.handleError<Hero[]>('getHeroes', [])))
  }
  getHero(id: number): Observable<Hero>
  {
    const hero = HEROES.find(h => h.id === id)!;
    //this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero)
  }
  updateHero(hero: Hero): Observable<any>
  {
    return this.http.put('http://localhost:3000/heroes', hero, this.httpOptions)
      .pipe( tap(_ => this.log(`update hero id = ${hero.id}`)), catchError(this.handleError<any>('updateHero')) );
  }
  addHero(hero: Hero): Observable<Hero>
  {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(tap((newHero: Hero)=> this.log(`added hero w/ id=${newHero.id}`)))
  }
  private log(message: string)
  {
    this.messageService.add(`HeroService: ${message}`)
  }
}
