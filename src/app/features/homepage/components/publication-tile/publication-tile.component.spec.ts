import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationTileComponent } from './publication-tile.component';

describe('PublicationTileComponent', () => {
  let component: PublicationTileComponent;
  let fixture: ComponentFixture<PublicationTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicationTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicationTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
