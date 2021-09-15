import React,{useEffect, useState} from "react";
import ObterTodosProdutos from '../../services/Produtos/produtosServices'
import { ObterCategorias } from "../../services/Categorias/categoriasServices";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import {Button} from "primereact/button"
import {InputText} from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import CreateSelectOptions from "../../Utils/CreateOptionsSelect";
const Produtos = () => {
  const [produtosLista,setProdutosLista] = useState([])
  const [openDialog,setOpenModal] = useState(false)
  const [listaCategorias,setCategorias] = useState([])
  const [categoriaSelecionada,setCategoriaSelecionada] = useState("")
  const ObterTodos = async () => {
    const {data} = await ObterTodosProdutos()
    console.log(data)
    setProdutosLista(data)
  }
  
  const ListarCategorias = async () => {
    const {data} = await ObterCategorias()
    setCategorias(CreateSelectOptions(data,"nome","categoriaId"))
  }


  useEffect(()=>{
    ObterTodos()
    ListarCategorias()
  },[])
  return( 
  <div className="p-d-flex p-flex-column ">
    <div>
      <Button label="Adicionar" icon="pi pi-plus" onClick={() => setOpenModal(true)} />
    </div>
    <div className="p-mt-3 ">
    <DataTable value={produtosLista}>
      <Column field="produtoId" header="Id" ></Column>
      <Column field="nome" header="Nome" ></Column>
      <Column field="descricao" header="Descrição" ></Column>
      <Column field="preco" header="Preço" ></Column>
    </DataTable>
    </div>
    <Dialog visible={openDialog} onHide={()=> setOpenModal(false)} closable={false} header="Adicionar Produto"> 
      <form id="produtosForm">
        <div className="p-fluid p-formgrid p-grid" >
          <div className="p-field p-col-12 p-md-6 ">
              <label htmlFor="nome" > Nome </label>
              <InputText name="nome" type="text" />
          </div>
          <div className="p-field p-col-12 p-md-6">
              <label htmlFor="descricao" > Descrição </label>
              <InputText name="descricao" type="text" />
          </div>
          <div className="p-field p-col-12 p-md-12">
              <label htmlFor="categoria" > Categoria </label>
              <Dropdown name="categoria" optionLabel="label" options={listaCategorias} onChange={(e)=>setCategoriaSelecionada(e.value)} value={categoriaSelecionada} />
          </div>
          <div className="p-field p-col-12 p-md-6">
          <label htmlFor="estoque" > Estoque </label>
              <InputNumber name="estoque"  />
          </div>
          <div className="p-field p-col-12 p-md-6">
          <label htmlFor="preco" > Preço </label>
              <InputNumber mode="currency" currency="BRL" locale="pt-BR" name="preco" />
          </div>
          <div className="p-field p-col-12 p-md-12">
              <label htmlFor="imagem" > Imagem URL </label>
              <InputText name="imagem" type="text" />
          </div>
        </div>
      </form>
      <div className="p-d-flex p-jc-end">
        <Button label="Salvar" icon="pi pi-save" className="p-mr-2" />
        <Button label="Voltar" icon="pi pi-times" onClick={()=>setOpenModal(false)}  className="p-button-danger p-button-outlined" />
      </div>
    </Dialog>
   
  </div>
  );
};

export default Produtos;
