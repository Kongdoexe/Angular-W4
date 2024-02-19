import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { TitleComponent } from './pages/title/title.component';

export const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'title/:id', component: TitleComponent }
];
