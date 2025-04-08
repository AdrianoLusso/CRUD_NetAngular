import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validador personalizado para 'fechaFinDescuento'
export function fechaFinDescuentoRequeridoPorDescuento(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const descuento = control?.parent?.get('descuento')?.value;
    const fechaFinDescuento = control?.value;

    // Si descuento es mayor a 0, entonces 'fechaFinDescuento' debe ser requerido.
    if (descuento > 0 && !fechaFinDescuento) {
      return { 'fechaFinDescuentoRequerido': true };
    }

    return null;  // Validación exitosa
  };
}
