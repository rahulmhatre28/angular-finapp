import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomsComponent } from './moms.component';

describe('MomsComponent', () => {
  let component: MomsComponent;
  let fixture: ComponentFixture<MomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
