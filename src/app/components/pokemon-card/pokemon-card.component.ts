import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  template: `
    <div class="pokemon-card">
      <img [src]="pokemon.sprites.front_default" [alt]="pokemon.name">
      <h2>{{ pokemon.name | titlecase }}</h2>
      <div class="types">
        <span *ngFor="let type of pokemon.types" class="type-badge {{type.type.name}}">
          {{ type.type.name }}
        </span>
      </div>
      <div class="info">
        <p>Peso: {{ pokemon.weight / 10 }} kg</p>
        <p>Altura: {{ pokemon.height / 10 }} m</p>
      </div>
      <div class="stats">
        <div *ngFor="let stat of pokemon.stats" class="stat">
          <span>{{ stat.stat.name | titlecase }}:</span>
          <div class="stat-bar">
            <div class="stat-fill" [style.width.%]="stat.base_stat / 2"></div>
            <span>{{ stat.base_stat }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .pokemon-card {
      background: white;
      border-radius: 10px;
      padding: 1rem;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      margin: 1rem;
      width: 300px;
    }

    img {
      width: 150px;
      height: 150px;
      display: block;
      margin: 0 auto;
    }

    .types {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      margin: 0.5rem 0;
    }

    .type-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      color: white;
      font-size: 0.9rem;
      text-transform: capitalize;
    }

    .stat {
      margin: 0.5rem 0;
    }

    .stat-bar {
      background: #f0f0f0;
      border-radius: 10px;
      height: 10px;
      position: relative;
      margin-top: 0.25rem;
    }

    .stat-fill {
      background: #4CAF50;
      height: 100%;
      border-radius: 10px;
      transition: width 0.3s ease;
    }
  `,
  ],
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
}
