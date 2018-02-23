import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ExpenseClaimsComponent } from './components/expenses/expense-claims/expense-claims.component';
import { ExpenseDetailsComponent } from './components/expenses/expense-details/expense-details.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('Router', () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes(appRoutes)],
        declarations: [
          PageNotFoundComponent,
          HomeComponent,
          ExpenseClaimsComponent,
          ExpenseDetailsComponent
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(HomeComponent);
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should redirect to "/home" when navigating to "/"', fakeAsync(() => {
    router.navigate(['home']);
    tick();
    expect(location.path()).toBe('');
  }));

  it('should go to "expenses" when navigating to "/expenses"', fakeAsync(() => {
    router.navigate(['expenses/1']);
    tick();
    expect(location.path()).toBe('/expenses/1');
  }));

});
