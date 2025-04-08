import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";



export function descuentoCategoricoONumerico():ValidatorFn{
    return (control:AbstractControl): ValidationErrors | null => {
        const talle = control?.parent?.get('talle')?.value;
        console.log('HIZO VALIDADOR')
        if(talle == ''){ // el talle no debe ser vacio
            return {'descuentoCategoricoONumerico' : true};
        }
        
        return null;  // Validación exitosa
    }
}