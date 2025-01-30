import { Component } from '@angular/core';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonListComponent,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Pokedex</span>
    </mat-toolbar>
    
    <div class="content-container">
      <app-pokemon-list></app-pokemon-list>
    </div>
  `,
  styles: [
    `
    :host {
      display: block;
      height: 100vh;
    }

    .content-container {
      padding: 16px;
      max-width: 1200px;
      margin: 0 auto;
    }

    @media (max-width: 599px) {
      .content-container {
        padding: 8px;
      }
    }
  `,
  ],
})
export class AppComponent {
  title = 'Pokedex';
}
