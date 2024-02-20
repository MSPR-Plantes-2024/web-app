import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterPublicationComponent } from './ajouter-publication.component';

describe('AjouterPublicationComponent', () => {
  let component: AjouterPublicationComponent;
  let fixture: ComponentFixture<AjouterPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouterPublicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
