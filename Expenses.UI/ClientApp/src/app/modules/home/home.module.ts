import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { homeRoutes } from './home.routes';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule, RouterModule.forChild(homeRoutes)]
})
export class HomeModule {}
