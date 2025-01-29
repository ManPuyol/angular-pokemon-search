import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  template: `
    <div class="search-container">
      <input 
        type="text" 
        [(ngModel)]="searchTerm" 
        placeholder="Buscar Pokémon..."
        (input)="filterPokemon()"
      >
    </div>
    <div class="pokemon-grid">
      <app-pokemon-card 
        *ngFor="let pokemon of filteredPokemon" 
        [pokemon]="pokemon"
      ></app-pokemon-card>
    </div>
  `,
  styles: [
    `
    .search-container {
      padding: 1rem;
      text-align: center;
    }

    input {
      padding: 0.5rem 1rem;
      width: 300px;
      border: 1px solid #ddd;
      border-radius: 20px;
      font-size: 1rem;
    }

    .pokemon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      padding: 1rem;
    }
  `,
  ],
})
export class PokemonListComponent implements OnInit {
  pokemon: Pokemon[] = [];
  filteredPokemon: Pokemon[] = [];
  searchTerm: string = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemonList(20).subscribe((pokemon) => {
      this.pokemon = pokemon;
      this.filteredPokemon = pokemon;
    });
  }

  filterPokemon() {
    this.filteredPokemon = this.pokemon.filter((p) =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
