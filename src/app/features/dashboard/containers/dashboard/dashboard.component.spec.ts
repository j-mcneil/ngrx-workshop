import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mock } from 'ts-mocks';

import { DashboardComponent } from './dashboard.component';
import * as components from 'src/app/features/dashboard/components';
import { DashboardFacadeService } from '../../services';
import { NEVER, of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const mockDashboardFacade = new Mock<DashboardFacadeService>({
    items$: of([
      { id: 1, name: 'Mug', price: 4.50, isRemovalPending: false },
      { id: 2, name: 'Hat', price: 14.50, isRemovalPending: false },
    ]),
    itemsLoading$: of(false),
    itemAdding$: of(false),
  });
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, ...components.components ],
      providers: [ 
        {
          provide: DashboardFacadeService,
          useValue: mockDashboardFacade.Object,
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
