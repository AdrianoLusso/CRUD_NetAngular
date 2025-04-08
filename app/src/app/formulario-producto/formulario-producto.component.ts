import { AfterViewChecked, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  RouterLink } from '@angular/router';
import { Ropa, RopaCreacion } from '../models/ropa.model';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { TipoTalle,TalleCategorico } from '../data-options/talle.data-options';
import { Color } from '../data-options/color.data-option';
import { MatNativeDateModule } from '@angular/material/core';
import { Console } from 'console';
import { fechaFinDescuentoRequeridoPorDescuento } from '../validators/fechaFinDescuentoRequeridoPorDescuento';
import { descuentoCategoricoONumerico } from '../validators/descuentoCategoricoONumerico';

@Component({
  selector: 'app-formulario-producto',
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule, MatButtonModule, RouterLink,MatSelectModule
    ,MatDatepickerModule,MatNativeDateModule],
  providers:[MatDatepickerModule],
  templateUrl: './formulario-producto.component.html',
  styleUrl: './formulario-producto.component.css'
})
export class FormularioProductoComponent implements OnInit,AfterViewChecked  {
  
  private readonly formBuilder  = inject(FormBuilder);
  TalleCategorico = TalleCategorico;
  TipoTalle = TipoTalle;
  Color = Color;

  minDate!:Date;

  @Input({required:true})
  titulo!:String;
  @Input()
  ropa?: Ropa;
  @Input()
  editar!:boolean;

  @Output()
  posteoFormulario = new EventEmitter<RopaCreacion>();

  form = this.formBuilder.group({
    codigo:['', [Validators.required,Validators.pattern('^[0-9]*$')]],
    marca:['', [Validators.required]],
    modelo:['', [Validators.required]],
    tipoTalle:['', [Validators.required]],
    talle:['', [Validators.required]],
    talleNumerico:[20,[Validators.min(20),Validators.max(100)]],
    color:['', [Validators.required]],
    precio:[1.0, [Validators.required]],
    descuento:[0, [Validators.required,Validators.min(0),Validators.max(100)]],
    fechaFinDescuento:[new Date(), [fechaFinDescuentoRequeridoPorDescuento()]]
  })

  ngOnInit(): void {
    if (this.ropa !== undefined){
      this.form.patchValue(this.ropa);
      if (this.form.value.tipoTalle == 'numerico'){
        let talle = this.form.value.talle ?? '';
        this.form.controls.talleNumerico.setValue(parseInt(talle,10));
      }
    }
    
    // set today var.
    const today = new Date();
    this.minDate = today;
  }

  ngAfterViewChecked(): void {
    this.reiniciarTalle();
    this.reiniciarFechaFinDescuento();
    if (this.form.value.tipoTalle == 'numerico')
      {
        let newTalle = this.form.value.talleNumerico?.toString() ?? '';
        this.form.controls.talle.setValue(newTalle); // set talleNumerico as string talle
      }
    console.log(this.form.value)
  }

  reiniciarFechaFinDescuento(): void{
    const descuento = this.form.value.descuento;
    const fechaFinDescuento = this.form.value.fechaFinDescuento;

    if(descuento == 0){
      this.form.controls.fechaFinDescuento.setValue(null);

    }
  }
  reiniciarTalle(): void {
    const tipo = this.form.value.tipoTalle;
    const talle = this.form.value.talle;
    const talleNumerico = this.form.value.talleNumerico;

    if((tipo =='categorico' && !TalleCategorico.some(item => item.value===talle)))
    {
      this.form.controls.talle.setValue('');
      this.form.controls.talleNumerico.setValue(20);

    }else if(tipo =='numerico' && TalleCategorico.some(item => item.value===talle))
    {
      this.form.controls.talle.setValue("20");
      this.form.controls.talleNumerico.setValue(20);
    }
  }

  obtenerError(val:FormControl,msm="El campo es requerido."): string{
    if (val.errors){
      return msm;
    }

    return '';
  }

  guardarCambios() {
    this.form.value.fechaFinDescuento?.setHours(0,0,0,0); // day start is set

    let ropa = this.form.value as RopaCreacion;
    this.posteoFormulario.emit(ropa);
  }
}


