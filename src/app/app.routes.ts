import { Routes } from '@angular/router';
import { WeatherComponent } from './Components/weather/weather.component';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'weather/:id', component: WeatherComponent},
  {path: '**', component: NotFoundComponent},

];
