using Microsoft.EntityFrameworkCore;
using server.entities;

namespace server
{
    public class DBContext: DbContext
    {
        public DbSet<Ropa> Ropas {get; set;}

        public DBContext(DbContextOptions options) : base(options)
        {
 
        }
    }
}