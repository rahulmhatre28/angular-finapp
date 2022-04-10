import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YtdComponent } from './ytd.component';

describe('YtdComponent', () => {
  let component: YtdComponent;
  let fixture: ComponentFixture<YtdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YtdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YtdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
