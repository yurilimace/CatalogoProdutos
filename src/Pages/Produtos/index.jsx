import React,{useEffect, useState} from "react";
import ObterTodosProdutos from '../../services/Produtos/produtosServices'
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import {Button} from "primereact/button"


const Produtos = () => {
  const [produtosLista,setProdutosLista] = useState([])
  const ObterTodos = async () => {
    const {data} = await ObterTodosProdutos()
    console.log(data)
    setProdutosLista(data)
  }
  
  useEffect(()=>{
    ObterTodos()
  },[])
  return( 
  <div className="p-d-flex p-flex-column ">
    <div>
      <Button label="Adicionar" icon="pi pi-plus" />
    </div>
    <div className="p-mt-3 ">
    <DataTable value={produtosLista}>
      <Column field="produtoId" header="Id" ></Column>
      <Column field="nome" header="Nome" ></Column>
      <Column field="descricao" header="Descrição" ></Column>
      <Column field="preco" header="Preço" ></Column>
    </DataTable>
    </div>
   
  </div>
  );
};

export default Produtos;
