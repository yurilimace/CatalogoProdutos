import * as yup from "yup";

export const ProdutoSchema = yup.object().shape({
  nome: yup.string().required("Campo Nome Obrigatório"),
  descricao: yup.string().required("Campo Nome Descrição Obrigatorio"),
  preco: yup.number().required("Campo Preço Obrigatório"),
  estoque: yup.number().required("Campo Estoque Obrigatório"),
  categoriaId: yup.number().required("Campo Categoria Obrigatorio"),
});
