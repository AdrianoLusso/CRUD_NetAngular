using Microsoft.EntityFrameworkCore;
using server;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Frontend URL
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// host and port where the server listens
builder.WebHost.UseUrls("http://localhost:5161"); 

// Add services to the container.
builder.Services.AddRazorPages();

// Add controllers to the container.
builder.Services.AddControllers();

// Connect to Tambo - https://cloud.tembo.io/orgs/org_2v9DWfdf1wcZoWB3WH9c3yZaOMR/instances/inst_1743548538946_MtIjMH_43/home
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<DBContext>(opciones => opciones.UseNpgsql(connectionString));

var app = builder.Build();

app.UseCors("AllowSpecificOrigin"); // Apply CORS politic

// Try DB connection
try
{
    // Crea una conexión a la base de datos con la cadena de conexión
    using (var connection = new NpgsqlConnection(connectionString))
    {
        // Intenta abrir la conexión
        connection.Open();

        // Asegúrate de que la conexión esté realmente abierta antes de continuar
        if (connection.State == System.Data.ConnectionState.Open)
        {
            Console.WriteLine("✅ Conexión exitosa a la base de datos.");
        }
        else
        {
            Console.WriteLine("❌ La conexión no se pudo abrir.");
        }

        // Realizar una pequeña consulta para asegurar que realmente podemos interactuar con la base de datos
        using (var cmd = new NpgsqlCommand("SELECT 1", connection))
        {
            var result = cmd.ExecuteScalar();
            if (result != null)
            {
                Console.WriteLine("✅ Conexión funcional a la base de datos. Se ejecutó la consulta con éxito.");
            }
            else
            {
                Console.WriteLine("❌ No se pudo ejecutar la consulta en la base de datos.");
            }
        }
    }
}
catch (Exception ex)
{
    // Si ocurre un error, muestra el mensaje de error
    Console.WriteLine($"❌ Error de conexión: {ex.Message}");
}

app.MapGet("/", () => "Servidor ASP.NET ejecutándose con base de datos...");

// Map the controllers to the app.
app.MapControllers(); 

app.Run();
