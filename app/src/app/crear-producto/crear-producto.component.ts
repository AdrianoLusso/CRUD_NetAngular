import { Component, inject } from '@angular/core';
import { RopaService } from '../services/ropa.service';
import { Router } from '@angular/router';
import { FormularioProductoComponent } from '../formulario-producto/formulario-producto.component';
import { RopaCreacion } from '../models/ropa.model';
import { takeErrors } from '../shared/functions/takeErrors';
import {MostrarErroresComponent} from '../shared/components/mostrar-errores/mostrar-errores.component'

@Component({
  selector: 'app-crear-producto',
  imports: [FormularioProductoComponent, MostrarErroresComponent],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent {
    router = inject(Router)
    ropaService = inject(RopaService)
    errores: string[] = [];

    guardarCambios(ropa:RopaCreacion) 
    {
      this.ropaService.crear(ropa).subscribe({
        next: () =>{
          this.router.navigate(["productos"]);
        },
        error: err => {
          const errores = takeErrors(err);
          this.errores = errores;
        }
      })
    }
}
