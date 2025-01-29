import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Pokédex</h1>
      <app-pokemon-list></app-pokemon-list>
    </div>
  `,
  styles: [
    `
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 2rem;
    }
  `,
  ],
})
export class AppComponent {}
