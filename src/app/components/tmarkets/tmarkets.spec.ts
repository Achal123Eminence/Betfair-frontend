import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TMarkets } from './tmarkets';

describe('TMarkets', () => {
  let component: TMarkets;
  let fixture: ComponentFixture<TMarkets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TMarkets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TMarkets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
