import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../models/pokemon.model';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <mat-card 
      role="listitem" 
      class="pokemon-card mat-elevation-z4" 
      [attr.aria-label]="'Pokemon ' + pokemon.name">
      <mat-card-header>
        <mat-card-title>{{ pokemon.name | titlecase }}</mat-card-title>
        <mat-card-subtitle>#{{ pokemon.id.toString().padStart(3, '0') }}</mat-card-subtitle>
      </mat-card-header>
      
      <img mat-card-image [src]="pokemon.sprites.front_default" [alt]="pokemon.name">
      
      <mat-card-content>
        <div class="info-section">
          <div class="types-container">
            <mat-chip-set>
              <mat-chip 
                *ngFor="let type of pokemon.types" 
                [class]="type.type.name"
              >
                {{ type.type.name | titlecase }}
              </mat-chip>
            </mat-chip-set>
          </div>
        
          <div class="info-container">
            <div class="info-item">
              <div class="info-stat">
                <span class="value">{{ pokemon.weight / 10 }}</span>
                <span class="unit">kg</span>
              </div>
            </div>
            <div class="info-item">
              <div class="info-stat">
                <span class="value">{{ pokemon.height / 10 }}</span>
                <span class="unit">m</span>
              </div>
            </div>
          </div>
        </div>

        <div class="stats">
          <div *ngFor="let stat of pokemon.stats" class="stat">
            <span>{{ stat.stat.name | titlecase }}</span>
            <mat-progress-bar
              mode="determinate"
              [value]="(stat.base_stat / 255) * 100"
             >
            </mat-progress-bar>
            <span class="stat-value">{{ stat.base_stat }}</span>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
    :host {
      display: block;
    }

    .pokemon-card {
      margin: 8px;
      transition: transform 0.2s;
      display: block;
      width: 100%;
      cursor: pointer;
    }

    .pokemon-card:hover {
      transform: translateY(-5px);
    }

    mat-card-header {
      text-align: center;
    }

    img {
      width: 150px;
      height: 150px;
      margin: 0 auto;
      display: block;
    }

    .types {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin: 8px 0;
    }

    mat-chip {
      justify-content: center;
      text-align: center;
    }

    .grass { background-color: #78c850; }
    .poison { background-color: #a040a0; }
    .fire { background-color: #f08030; }
    .water { background-color: #6890f0; }
    .bug { background-color: #a8b820; }
    .flying { background-color: #a890f0; }
    .normal { background-color: #a8a878; }
    .electric { background-color: #f8d030; }
    .ground { background-color: #e0c068; }
    .fairy { background-color: #ee99ac; }
    .fighting { background-color: #c03028; }
    .psychic { background-color: #f85888; }
    .rock { background-color: #b8a038; }
    .steel { background-color: #b8b8d0; }
    .ice { background-color: #98d8d8; }
    .ghost { background-color: #705898; }
    .dragon { background-color: #7038f8; }
    .dark { background-color: #705848; }

    .info {
      text-align: center;
      margin: 8px 0;
    }

    .info-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      gap: 4px;
    }    
    .stats {
      padding: 8px;
    }

    .stat {
      display: grid;
      grid-template-columns: 120px 1fr 40px;
      gap: 8px;
      align-items: center;
      margin: 4px 0;
    }

    .stat-value {
      text-align: right;
    }


    .info-container {
      display: flex;
      justify-content: space-around;
      padding: 12px;
      gap: 8px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      margin: 8px 0;
    }
    
    .info-item {
      display: flex;
      align-items: center;
      gap: 8px;
    
      mat-icon {
        color: rgba(255, 255, 255, 0.7);
        font-size: 20px;
        height: 20px;
        width: 20px;
      }
    }
    
    .info-stat {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    
    .value {
      font-size: 16px;
      font-weight: 500;
    }
    
    .unit {
      font-size: 12px;
      opacity: 0.7;
    }
    @media (max-width: 599px) {
      .pokemon-card {
        margin: 4px;
      }
    }
  `,
  ],
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
}
