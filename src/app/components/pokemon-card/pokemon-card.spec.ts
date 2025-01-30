import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { Pokemon } from '../../models/pokemon.model';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

  const mockPokemon: Pokemon = {
    id: 1,
    name: 'bulbasaur',
    sprites: { front_default: 'test-url' },
    types: [{ type: { name: 'grass' } }],
    stats: [{ base_stat: 45, stat: { name: 'hp' } }],
    height: 7,
    weight: 69
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PokemonCardComponent,
        MatCardModule,
        MatChipsModule,
        MatIconModule,
        MatProgressBarModule
      ],
    }).compileComponents();
  });

  it('should render pokemon name correctly', () => {
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    component.pokemon = mockPokemon;
    fixture.detectChanges();
    
    const title = fixture.nativeElement.querySelector('mat-card-title');
    expect(title.textContent).toContain('Bulbasaur');
  });

  it('should display pokemon ID with padded zeros', () => {
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    component.pokemon = mockPokemon;
    fixture.detectChanges();
    
    const subtitle = fixture.nativeElement.querySelector('mat-card-subtitle');
    expect(subtitle.textContent).toContain('001');
  });

  it('should render pokemon types correctly', () => {
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    component.pokemon = mockPokemon;
    fixture.detectChanges();
    
    const typeChips = fixture.nativeElement.querySelectorAll('mat-chip');
    expect(typeChips.length).toBe(1);
    expect(typeChips[0].textContent.trim()).toBe('Grass');
    expect(typeChips[0].classList.contains('grass')).toBeTrue();
  });

  it('should display converted weight in kg', () => {
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    component.pokemon = mockPokemon;
    fixture.detectChanges();
    
    const weightElement = fixture.nativeElement.querySelector('.info-item:first-child .value');
    expect(weightElement.textContent).toContain('6.9');
  });

  it('should display converted height in meters', () => {
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    component.pokemon = mockPokemon;
    fixture.detectChanges();
    
    const heightElement = fixture.nativeElement.querySelector('.info-item:last-child .value');
    expect(heightElement.textContent).toContain('0.7');
  });

  it('should render stats with correct progress bars', () => {
    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    component.pokemon = mockPokemon;
    fixture.detectChanges();
    
    const statElements = fixture.nativeElement.querySelectorAll('.stat');
    expect(statElements.length).toBe(1);
    
    const progressBar = statElements[0].querySelector('mat-progress-bar');
    expect(progressBar.getAttribute('aria-valuenow')).toBe('17.647058823529413'); // (45/255)*100
  });
});