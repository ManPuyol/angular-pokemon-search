import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ScrollingModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    PokemonCardComponent
  ],
  template: `
    <mat-form-field appearance="outline" class="search-field">
      <mat-label>Search Pokémon</mat-label>
      <input 
        matInput 
        [(ngModel)]="searchTerm" 
        (input)="onSearchInput()"
        aria-label="Search Pokemon"
        role="searchbox"
      >
      <mat-icon matSuffix aria-hidden="true">search</mat-icon>
    </mat-form-field>

    <div 
      class="viewport"
      role="main"
      aria-label="Pokemon list"
      (scroll)="onScroll($event)"  
      >
      <div class="pokemon-grid">
        <app-pokemon-card
          *ngFor="let pokemon of filteredPokemon"
          [pokemon]="pokemon"
          class="pokemon-card">
        </app-pokemon-card>
      </div>

      <div *ngIf="!loading && filteredPokemon.length === 0" class="no-results">
        <mat-icon>search_off</mat-icon>
        <p>Pokemon not found</p>
      </div>

      <div *ngIf="loading" class="loading">
        <mat-spinner diameter="40"></mat-spinner>
      </div>
    </div>
  `,
  styles: [
    `
    .viewport {
      height: calc(100vh - 23vh);
      width: 100%;
      overflow-y: auto;
    }

    .pokemon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      padding: 16px;
      width: 100%;
      box-sizing: border-box;
    }

    .search-field {
      width: 100%;
      max-width: 500px;
      margin: 16px auto;
      display: block;
    }

    .loading {
      position: relative;
      height: 60px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 16px 0;
    }

    .no-results {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      color: rgba(0, 0, 0, 0.54);
    }

    .no-results mat-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      margin-bottom: 1rem;
    }

    @media (max-width: 599px) {
      .pokemon-grid {
        grid-template-columns: 1fr;
        padding: 8px;
      }
    }
  `,
  ],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  
  pokemon: Pokemon[] = [];
  filteredPokemon: Pokemon[] = [];
  searchTerm: string = '';
  loading = false;
  private pageSize = 20;
  private hasMoreData = true;
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.setupSearch();
    this.loadInitialPokemon();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    const threshold = 200;
    const reachedBottom = 
      target.scrollHeight - (target.scrollTop + target.clientHeight) < threshold;

    if (reachedBottom && !this.loading && this.hasMoreData) {
      this.loadMorePokemon();
    }
  }

  private setupSearch() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(term => {
      if (term) {
        this.performSearch(term);
      } else {
        this.loadInitialPokemon();
      }
    });
  }

  private loadInitialPokemon() {
    this.loading = true;
    this.pokemonService.getPokemonList(0, this.pageSize).subscribe({
      next: (pokemon) => {
        this.pokemon = pokemon;
        this.filteredPokemon = pokemon;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading Pokemon:', error);
        this.loading = false;
      }
    });
  }

  private loadMorePokemon() {
    if (this.loading || !this.hasMoreData || this.searchTerm) return;
    
    this.loading = true;
    const offset = this.pokemon.length;
  
    this.pokemonService.getPokemonList(offset, this.pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (newPokemon) => {
          this.hasMoreData = newPokemon.length === this.pageSize;
          this.pokemon = [...this.pokemon, ...newPokemon];
          this.filteredPokemon = this.pokemon;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading more Pokemon:', error);
          this.loading = false;
          this.hasMoreData = false;
        }
      });
  }

  onSearchInput() {
    this.searchSubject.next(this.searchTerm);
  }

  private performSearch(term: string) {
    this.loading = true;
    this.pokemonService.searchPokemon(term).subscribe({
      next: (pokemon) => {
        this.filteredPokemon = pokemon;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error searching Pokemon:', error);
        this.loading = false;
      }
    });
  }
}