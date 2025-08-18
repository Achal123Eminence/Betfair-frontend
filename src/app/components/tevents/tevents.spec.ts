import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEvents } from './tevents';

describe('TEvents', () => {
  let component: TEvents;
  let fixture: ComponentFixture<TEvents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TEvents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TEvents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
