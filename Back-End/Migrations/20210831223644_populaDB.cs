using Microsoft.EntityFrameworkCore.Migrations;

namespace APICatalogo.Migrations
{
    public partial class populaDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Insert into Categorias(Nome,ImagemUrl) Values('Bebidas'," +
                "'https://www.dinvo.com.br/blog/wp-content/uploads/2018/04/bebidas.jpg')");
            migrationBuilder.Sql("Insert into Produtos(Nome,Descricao,Preco,ImagemUrl,Estoque," +
                "DataCadastro,CategoriaId)  Values('Coca-Cola','Refrigerante','5.45'," +
                "'https://d3pt1seq4txask.cloudfront.net/Custom/Content/Products/01/01/0101_refrigerante-coca-cola-lata-350ml-14_m6_637417305699974110.jpg','50',now()," +
                "(Select CategoriaId from Categorias where Nome='Bebidas'))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete from Categoria");
            migrationBuilder.Sql("Delete from Produtos");
        }
    }
}
