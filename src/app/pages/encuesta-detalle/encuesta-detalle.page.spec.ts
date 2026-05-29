import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EncuestaDetallePage } from './encuesta-detalle.page';

describe('EncuestaDetallePage', () => {
  let component: EncuestaDetallePage;
  let fixture: ComponentFixture<EncuestaDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestaDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
