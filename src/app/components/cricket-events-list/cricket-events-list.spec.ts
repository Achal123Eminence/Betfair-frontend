import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketEventsList } from './cricket-events-list';

describe('CricketEventsList', () => {
  let component: CricketEventsList;
  let fixture: ComponentFixture<CricketEventsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CricketEventsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CricketEventsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
