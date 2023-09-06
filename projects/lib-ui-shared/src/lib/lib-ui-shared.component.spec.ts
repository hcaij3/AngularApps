import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibUiSharedComponent } from './lib-ui-shared.component';

describe('LibUiSharedComponent', () => {
  let component: LibUiSharedComponent;
  let fixture: ComponentFixture<LibUiSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibUiSharedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibUiSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
