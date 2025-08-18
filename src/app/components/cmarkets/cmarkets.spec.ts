import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cmarkets } from './cmarkets';

describe('Cmarkets', () => {
  let component: Cmarkets;
  let fixture: ComponentFixture<Cmarkets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cmarkets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cmarkets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
