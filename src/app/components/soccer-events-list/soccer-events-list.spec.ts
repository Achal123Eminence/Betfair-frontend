import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoccerEventsList } from './soccer-events-list';

describe('SoccerEventsList', () => {
  let component: SoccerEventsList;
  let fixture: ComponentFixture<SoccerEventsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoccerEventsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoccerEventsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
