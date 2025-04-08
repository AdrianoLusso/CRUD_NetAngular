using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class TablaRopas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ropas",
                columns: table => new
                {
                    Codigo = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    marca = table.Column<string>(type: "text", nullable: false),
                    modelo = table.Column<string>(type: "text", nullable: false),
                    talle = table.Column<string>(type: "text", nullable: false),
                    tipoTalle = table.Column<string>(type: "text", nullable: false),
                    color = table.Column<string>(type: "text", nullable: false),
                    precio = table.Column<int>(type: "integer", nullable: false),
                    descuento = table.Column<int>(type: "integer", nullable: false),
                    fechaFinDescuento = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ropas", x => x.Codigo);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ropas");
        }
    }
}
