import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FMarkets } from './fmarkets';

describe('FMarkets', () => {
  let component: FMarkets;
  let fixture: ComponentFixture<FMarkets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FMarkets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FMarkets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
