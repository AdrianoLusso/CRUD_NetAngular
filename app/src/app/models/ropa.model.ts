export interface RopaCreacion {
    codigo: String;
}

export interface Ropa {
    codigo:string;
    marca:string;
    modelo:string;
    talle:string;
    tipoTalle:string;
    color:string;
    precio:number;
    descuento:number;
    fechaFinDescuento:Date
}