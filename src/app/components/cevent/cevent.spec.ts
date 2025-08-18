import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEvent } from './cevent';

describe('CEvent', () => {
  let component: CEvent;
  let fixture: ComponentFixture<CEvent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CEvent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CEvent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
