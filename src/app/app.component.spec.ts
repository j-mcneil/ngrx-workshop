import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';
import { Mock } from 'ts-mocks';

import { AppComponent } from './app.component';
import { AppFacadeService } from './core/services';

describe('AppComponent', () => {
  const mockAppFacade = new Mock<AppFacadeService>({
    isDarkTheme$: of(false),
    notifications$: of([]),
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [ 
        {
          provide: AppFacadeService,
          useValue: mockAppFacade.Object,
        },
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
