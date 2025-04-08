using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
using server.entities;
using server;
using Microsoft.EntityFrameworkCore;

namespace server.Controllers
{

    [Route("api/ropas")]
    [ApiController]
    public class RopasController:ControllerBase
    {
        private readonly DBContext context;

        public RopasController(DBContext context)
        {
            this.context = context;
        } 

        [HttpGet]
        public async Task<List<Ropa>> Get()
        {
            return await context.Ropas.ToListAsync();
        }

        [HttpGet("{codigo:int}", Name = "getRopaByCodigo")]
        public async Task<ActionResult<Ropa>> Get(int codigo)
        {
            var ropa = await context.Ropas.FirstOrDefaultAsync(x => x.Codigo == codigo);

            if (ropa is null)
            {
                return NotFound();
            }

            return ropa;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Ropa ropa)
        {
            var yaExisteRopa = await context.Ropas.AnyAsync(x => x.Codigo == ropa.Codigo);
            if (yaExisteRopa){
                var errorMsg = $"Ya existe prenda de ropa con este codigo.";
                ModelState.AddModelError(nameof(ropa.Codigo),errorMsg);
                return ValidationProblem(ModelState);
            }
            

            context.Add(ropa);
            await context.SaveChangesAsync();
            return CreatedAtRoute("getRopaByCodigo", new {codigo = ropa.Codigo},ropa);
        }

        [HttpPut("{codigo:int}")]
        public async Task<ActionResult> Put(int codigo, [FromBody] Ropa ropa)
        {
            var existeRopa = await context.Ropas.AnyAsync(x => x.Codigo == codigo);

            if(!existeRopa)
            {
                return NotFound();
            }
            ropa.Codigo = codigo;
            context.Update(ropa);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{codigo:int}")]
        public async Task<ActionResult> Delete(int codigo)
        {
            var tuplasBorradas = await context.Ropas.Where(x => x.Codigo == codigo).ExecuteDeleteAsync();

            if (tuplasBorradas == 0)
            {
                return NotFound();
            }

            return NoContent();
        }

    }

}