import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MoviesService } from 'src/app/services/movies.service';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { MovieFormComponent } from '../movie-form/movie-form.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],

})

export class MovieListComponent {

  movies: any = [];
  dataSource!: any;
  displayedColumns = ['title', 'released', 'genre', 'synopsis', 'tools' ];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private moviesService: MoviesService,
    public dialog: MatDialog
    ){}

  async ngOnInit() {
    try {
        this.movies = (await this.moviesService.getMovies()).results;
        localStorage.setItem('movies', JSON.stringify(this.movies));
        this.dataSource = new MatTableDataSource(this.movies);
        this.dataSource.paginator = this.paginator;
    } catch (error) {
      Swal.fire("Ha ocurrido un error. Intente mas tarde", "", "error");
      console.log(error);
    }
  }

  openMovieForm(index= -1, movie={}){
    const dialogRef = this.dialog.open(MovieFormComponent, {
      data: {movie, index},
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.movieIndex < 0){
        this.movies.push(result.formData);
        this.dataSource.data = this.movies;
        localStorage.setItem('movies', JSON.stringify(this.movies));
        Swal.fire("Película creada exitosamente!", "", "success");
      }else{
        this.movies[result.movieIndex] = result.formData;
        this.dataSource.data = this.movies;
        localStorage.setItem('movies', JSON.stringify(this.movies));
        Swal.fire("Película editada exitosamente!", "", "success");
      }

    });

  }
  deleteMovie(index: number, title: string){

    Swal.fire({
      title: `¿Está seguro que desea eliminar '${title}' '${index}'del listado?`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: "Eliminar",
      icon:'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.movies.splice(index, 1);
        localStorage.setItem('movies', JSON.stringify(this.movies));
        this.dataSource.data = this.movies;
        Swal.fire("Pelicula eliminada exitósamente", "", "success");
      }
    });

  }

  getRealIndex(indexInPage: number): number {
    const pageIndex = this.dataSource.paginator?.pageIndex || 0;
    return pageIndex * (this.dataSource.paginator?.pageSize || 0) + indexInPage;
  }

}
