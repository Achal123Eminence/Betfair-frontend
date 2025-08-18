import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TennisEventsList } from './tennis-events-list';

describe('TennisEventsList', () => {
  let component: TennisEventsList;
  let fixture: ComponentFixture<TennisEventsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TennisEventsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TennisEventsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
