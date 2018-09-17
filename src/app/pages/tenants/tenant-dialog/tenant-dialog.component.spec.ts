import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantDialogComponent } from './tenant-dialog.component';

describe('TenantDialogComponent', () => {
  let component: TenantDialogComponent;
  let fixture: ComponentFixture<TenantDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
