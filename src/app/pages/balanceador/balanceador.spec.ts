import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Balanceador } from './balanceador';

describe('Balanceador', () => {
  let component: Balanceador;
  let fixture: ComponentFixture<Balanceador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Balanceador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Balanceador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
