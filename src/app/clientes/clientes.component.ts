import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService) {
    //constructor
  }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      (clientes) => this.clientes = clientes
    );
  }

  delete(cliente: Cliente): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas borrar al cliente ${ cliente.nombre } ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire(
              'Cliente eliminado!',
              'Cliente eliminado con éxito',
              'success'
            )
          }
        )
        
      }
    })
  }
}
