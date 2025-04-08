import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { RopaService } from '../services/ropa.service';
import {Ropa} from '../models/ropa.model'
import {MatTableModule} from '@angular/material/table'
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-indice-productos',
  imports: [MatButtonModule,RouterLink,MatTableModule,SweetAlert2Module,LoadingComponent
    ,MatGridListModule,MatCardModule
  ],
  templateUrl: './indice-productos.component.html',
  styleUrl: './indice-productos.component.css'
})
export class IndiceProductosComponent {

    ropaService = inject(RopaService);
    ropas?: Ropa[]; 
    columnasAMostrar = ['codigo','acciones'];
    currentDate:Date;

    constructor(){
      this.cargarProductos();
      this.currentDate = new Date();
      this.currentDate.setHours(0,0,0,0);
    }

    cargarProductos()
    {
      this.ropaService.obtenerTodos().subscribe(ropas => {
        this.ropas = ropas
        for(let ropa of ropas){
          ropa.fechaFinDescuento = new Date(ropa.fechaFinDescuento);
        }
      });
    }

    borrar(codigo: String)
    {
      this.ropaService.borrar(codigo).subscribe(() => {
        Swal.fire('Exitoso','La prenda de ropa fue borrada exitosamente.','success');
        this.cargarProductos();
      });
    }

    calcularDescuento(precio:number,descuento:number):number{
      return precio - precio * (descuento/100);
    }
}
