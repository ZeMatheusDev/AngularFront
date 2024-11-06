import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemSocioComponent } from './listagem-socio.component';

describe('ListagemSocioComponent', () => {
  let component: ListagemSocioComponent;
  let fixture: ComponentFixture<ListagemSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemSocioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
