export default function CreateSelectOptions(lista, titulo, valor) {
  return lista.map((element) => ({
    label: element[titulo],
    value: element[valor],
  }));
}
