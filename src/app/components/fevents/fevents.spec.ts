import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FEvents } from './fevents';

describe('FEvents', () => {
  let component: FEvents;
  let fixture: ComponentFixture<FEvents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FEvents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FEvents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
