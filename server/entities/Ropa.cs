using System.ComponentModel.DataAnnotations;

namespace server.entities
{
    public class Ropa
    {
        // ATRIBUTOS
        [Key]
        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public required int Codigo {get;set;}
        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public required string marca {get;set;}
        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public required string modelo {get;set;}
        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public required string talle {get;set;}
        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public required string tipoTalle {get;set;}  
        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public required string color {get;set;}
        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public required int precio {get;set;} // los precios no suelen usar mas de dos decimales para centavos. Aprovechamos float por su menor tamanio que double.
        [Required(ErrorMessage = "El campo {0} es requerido.")]
        [Range(0, 100, ErrorMessage = "El descuento debe estar entre {1} y {2}.")]
        public required int descuento {get;set;}
        public required DateTime? fechaFinDescuento {get;set;}


    }
}