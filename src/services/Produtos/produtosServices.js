import { baseUrl } from "../baseURL";

export async function ObterTodosProdutos() {
  return await baseUrl.get("/produtos");
}

export async function AdicionarNovoProduto(produto) {
  return await baseUrl.post("/produtos", produto);
}

export async function ApagarProduto(id) {
  return await baseUrl.delete(`/produtos/${id}`);
}
