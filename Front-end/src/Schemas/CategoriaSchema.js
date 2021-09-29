import * as yup from "yup";

export const CategoriaSchema = yup.object().shape({
  nome: yup.string().required("Campo Obrigatório"),
  ImagemUrl: yup.string().required("Campo Obrigatório"),
});
