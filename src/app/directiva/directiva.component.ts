import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
})
export class DirectivaComponent {

  listaCurso = ['TypeScript', 'JavaScript', 'Java SE', 'C#', 'PHP'];

  habilitar = true;

  constructor(){
    //constructor vacio
  }

  setHabilitar(): void {
    this.habilitar = (this.habilitar === true) ? false : true;
  }
}
