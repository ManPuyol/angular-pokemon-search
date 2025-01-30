import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, switchMap, mergeMap, map } from 'rxjs/operators';

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemonList(offset: number = 0, limit: number = 50): Observable<Pokemon[]> {
    return this.http.get<PokemonListResponse>(
      `${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`
    ).pipe(
      map(response => response.results),
      mergeMap(results => {
        if (results.length === 0) return of([]);
        const pokemonRequests = results.map(result => 
          this.http.get<Pokemon>(result.url)
        );
        return forkJoin(pokemonRequests);
      })
    );
  }

  searchPokemon(query: string): Observable<Pokemon[]> {
    // Search using API's filter
    return this.http.get<PokemonListResponse>(
      `${this.baseUrl}/pokemon?limit=10000`
    ).pipe(
      map(response => response.results.filter(pokemon => 
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      )),
      switchMap(results => {
        if (results.length === 0) {
          return of([]); // Return empty array if no matches found
        }
        const pokemonRequests = results.map(result =>
          this.http.get<Pokemon>(result.url)
        );
        return forkJoin(pokemonRequests);
      })
    );
  }
}
