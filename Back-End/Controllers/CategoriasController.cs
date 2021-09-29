using APICatalogo.Context;
using APICatalogo.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APICatalogo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoriasController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet("produtos")]
        public async Task<ActionResult<IEnumerable<Categoria>>> GetCategoriasEProdutos()
        {
            return await _context.Categorias.Include(x => x.Produtos).ToListAsync();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categoria>>> GetCategorias()
        {
            return await _context.Categorias.ToListAsync();
        }


        [HttpGet("{id}",Name="ObterCategoria")]
        public async Task<ActionResult<Categoria>> GetCategoria(int id)
        {
            var catergoria = await _context.Categorias.FindAsync(id);
            if(catergoria == null)
            {
                return NotFound();
            }
            else
            {
                return catergoria;
            }
        }

        [HttpPost]
        public ActionResult AdicionarCategoria([FromBody] Categoria categoria)
        {
            _context.Categorias.Add(categoria);
            _context.SaveChanges();
            return Ok();
            //return CreatedAtRouteResult("ObterCategoria",new { id=categoria.CategoriaId},categoria)
        }

        [HttpPut("{id}")]
        public ActionResult AtualizarCategoria(int id,[FromBody]Categoria categoria)
        {
            if(id != categoria.CategoriaId)
            {
                return BadRequest();
            }
            _context.Entry(categoria).State = EntityState.Modified;
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoria(int id)
        {
            var categoria = await _context.Categorias.FindAsync(id);
            if(categoria == null)
            {
                return NotFound();
            }
            _context.Categorias.Remove(categoria);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }

       
      
}
