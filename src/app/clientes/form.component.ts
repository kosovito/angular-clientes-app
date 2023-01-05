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
        swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con éxito!`, 'success')
      });
  }

  public update(): void {
    this.clienteService.update(this.cliente)
      .subscribe((cliente) => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente actualizado', `Cliente ${cliente.nombre} actualizado con éxito!`, 'success')
      }
      )
  }
}

