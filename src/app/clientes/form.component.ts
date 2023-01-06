import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {

  public cliente: Cliente = new Cliente();
  public titulo = 'Crear cliente';

  public errores: string[];

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  public cargarCliente(): void{
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
    })
  }

  public create(): void {
    this.clienteService.create(this.cliente)
      .subscribe((cliente) => {
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con éxito`, 'success')
      },
        err => {
          this.errores = err.error.error as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.error);
        }
      );
  }

  public update(): void {
    this.clienteService.update(this.cliente)
      .subscribe((json) => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente actualizado', `${json.mensaje}: ${json.cliente.nombre}`, 'success')
      },
        err => {
          this.errores = err.error.error as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.error);
        }
      )
  }
}

