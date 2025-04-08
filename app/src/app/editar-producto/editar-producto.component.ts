import { Component, inject, Input, input, numberAttribute, OnInit } from '@angular/core';
import { RopaService } from '../services/ropa.service';
import { Ropa, RopaCreacion } from '../models/ropa.model';
import { Router } from '@angular/router';
import { FormularioProductoComponent } from '../formulario-producto/formulario-producto.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { MostrarErroresComponent } from '../shared/components/mostrar-errores/mostrar-errores.component';
import { takeErrors } from '../shared/functions/takeErrors';

@Component({
  selector: 'app-editar-producto',
  imports: [FormularioProductoComponent,LoadingComponent,MostrarErroresComponent],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent implements OnInit
{
  ropaService = inject(RopaService);
  router = inject(Router)
  ropa?: Ropa;
  errores: string[] = [];

  @Input()
  codigo!: String // ! asegura que la var. no sera null en tiempo de ejecucion, para que el comp. sepa esta info.

  ngOnInit(): void {
    this.ropaService.obtenerPorCodigo(this.codigo).subscribe(ropa => {
      this.ropa = ropa;
      this.ropa.fechaFinDescuento = new Date(ropa.fechaFinDescuento);       
    })
  }
  
  guardarCambios(ropa:RopaCreacion)
  {

          this.ropaService.actualizar(this.codigo,ropa).subscribe({
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
