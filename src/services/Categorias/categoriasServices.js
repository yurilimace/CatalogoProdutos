import { baseUrl } from "../baseURL";

export async function ObterCategorias() {
  return await baseUrl.get("/categorias");
}

export async function AdicionarCategoria(categoria) {
  return await baseUrl.post("/categorias", categoria);
}

export async function ExcluirCategoria(idCategoria) {
  return await baseUrl.delete(`categorias/${idCategoria}`);
}

export async function EditarCategoria(idCategoria, categoria) {
  categoria.CategoriaId = idCategoria;
  return await baseUrl.put("/categorias", categoria);
}
