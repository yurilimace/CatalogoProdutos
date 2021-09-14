import { baseUrl } from "../baseURL";

export default async function ObterTodosProdutos() {
  return await baseUrl.get("/produtos");
}
