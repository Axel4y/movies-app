import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './components/movie/movie-list/movie-list.component';

const routes: Routes = [
  {
    path: 'movies',
    component: MovieListComponent,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'movies' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
