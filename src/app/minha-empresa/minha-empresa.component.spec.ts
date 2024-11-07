import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhaEmpresaComponent } from './minha-empresa.component';

describe('MinhaEmpresaComponent', () => {
  let component: MinhaEmpresaComponent;
  let fixture: ComponentFixture<MinhaEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinhaEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinhaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
