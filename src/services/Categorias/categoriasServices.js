import { baseUrl } from "../baseURL";

export async function ObterCategorias() {
  return await baseUrl.get("/categorias");
}
