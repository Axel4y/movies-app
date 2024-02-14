import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent {
  movieForm: FormGroup;
  genreChips: any = [];
  movieIndex = -1;
  formTitle='Nueva Película';
  constructor(
    public dialogRef: MatDialogRef<MovieFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      released: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      genre: [[], [Validators.required]],
      synopsis: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    if( this.data.index >=0){
      this.formTitle = 'Editar';
      this.movieIndex = this.data.index;
      this.genreChips = this.data.movie.genre;
      this.movieForm.patchValue(this.data.movie);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.genreChips.push(value);
    }
    this.movieForm.controls['genre'].setValue(this.genreChips);
    event.chipInput!.clear();
  }
  removeKeyword(index: number) {
    if(this.genreChips[index]){
      this.genreChips.splice(index, 1);
      this.movieForm.controls['genre'].setValue(this.genreChips);
    }

  }

  closeModal(): void {
    this.dialogRef.close();
  }

  saveMovie(){
    if(!this.movieForm.valid){
      return;
    }
    this.dialogRef.close({formData:this.movieForm.value, movieIndex: this.movieIndex});
  }

}
