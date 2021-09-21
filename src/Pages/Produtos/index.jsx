import React,{useEffect, useState} from "react";
import {ObterTodosProdutos,AdicionarNovoProduto,ApagarProduto,EditarProduto} from '../../services/Produtos/produtosServices'
import { ObterCategorias } from "../../services/Categorias/categoriasServices";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import {Button} from "primereact/button"
import {InputText} from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { useForm,Controller } from "react-hook-form";
import { Dropdown } from 'primereact/dropdown';
import {ProdutoSchema} from '../../Schemas/ProdutoSchema'
import CreateSelectOptions from "../../Utils/CreateOptionsSelect";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";

const Produtos = () => {
  const [produtosLista,setProdutosLista] = useState([])
  const [produtoSelecionado,setProdutoSelecionado] = useState(null)
  const [openDialog,setOpenModal] = useState(false)
  const [listaCategorias,setCategorias] = useState([])
  const [requestLoading,setRequestLoading] = useState(false)

  const {register,handleSubmit,control,reset,formState:{errors}} = useForm({
    resolver:yupResolver(ProdutoSchema)
  })

  const ObterTodos = async () => {
    const {data} = await ObterTodosProdutos()
    setProdutosLista(data)
  }
  
  const ListarCategorias = async () => {
    const {data} = await ObterCategorias()
    setCategorias(CreateSelectOptions(data,"nome","categoriaId"))
  }

  const DeletarProduto = async(id) => {
     const data = await ApagarProduto(id.produtoId)
     if(data.status === 204){
      toast.success("Sucesso ao deletar produto",{
        autoClose:2000,
        onClose: async () => {
          await ObterTodos()
        }
      })
  }
}

  const SelecionarProduto = async(produto) =>{
    setProdutoSelecionado(produto)
    setOpenModal(true)
  }

  const HandleEditar = async() => {
    await EditarProduto(produtoSelecionado.Id)
  }

  const HandleCloseModal = () => {
    setOpenModal(false)
    reset()
    setProdutoSelecionado(null)
  }

  const OnSubmit = async (data) => {
  debugger
   setRequestLoading(true)
    const responseData =  produtoSelecionado !== null ?  await EditarProduto(produtoSelecionado.produtoId,data) :  await AdicionarNovoProduto(data)
    console.log(responseData)
    if(responseData.status === 201){
      toast.success("Sucesso ao adicionar produto",{
        autoClose:2000,
        onClose: async () => {
          setRequestLoading(false)
          setOpenModal(false)
          await ObterTodos()
        }
      })
    }
    else if(responseData.status === 204){
      toast.success("Sucesso ao editar produto",{
        autoClose:2000,
        onClose: async () => {
          setRequestLoading(false)
          setOpenModal(false)
          await ObterTodos()
        }
      })
    }
   

  }


  useEffect(()=>{
    ObterTodos()
    ListarCategorias()
  },[])
  
  return( 
  <div className="p-d-flex p-flex-column ">
    <div>
      <Button label="Adicionar" icon="pi pi-plus"   onClick={() => setOpenModal(true)} />
    </div>
    <div className="p-mt-3 ">
    
     <DataTable value={produtosLista}>
      <Column field="produtoId" header="Id" ></Column>
      <Column field="nome" header="Nome" ></Column>
      <Column field="descricao" header="Descrição" ></Column>
      <Column field="preco" header="Preço" ></Column>
      <Column header="Ações" body={(rowData) =><div>
        <Button icon="pi pi-trash" onClick={() => DeletarProduto(rowData)}  className="p-button-text p-button-danger p-mr-2" />
        <Button icon="pi pi-pencil" onClick={() => SelecionarProduto(rowData)} className="p-button-text " />
      </div>} ></Column>
    </DataTable>
   
    </div>
    <Dialog visible={openDialog} onHide={()=> HandleCloseModal()} closable={false} header="Adicionar Produto"> 
      <form id="produtosForm" onSubmit={handleSubmit(OnSubmit)}>
        <div className="p-fluid p-formgrid p-grid" >
          <div className="p-field p-col-12 p-md-6 ">
              <label htmlFor="nome" > Nome </label>
              <InputText name="nome" type="text" defaultValue={produtoSelecionado !== null ? produtoSelecionado.nome : ""} {...register("nome")} />
              <p className="p-error"> {errors.nome?.message} </p>
          </div>
          <div className="p-field p-col-12 p-md-6">
              <label htmlFor="descricao" > Descrição </label>
              <InputText name="descricao" className="p-border-danger"defaultValue={produtoSelecionado !== null ? produtoSelecionado.descricao : ""} type="text" {...register("descricao")} />
              <p className="p-error"> {errors.descricao?.message} </p>
          </div>
          <div className="p-field p-col-12 p-md-12">
              <label htmlFor="categoriaId" > Categoria </label>
              <Controller
              name="categoriaId"
              defaultValue={produtoSelecionado !== null ? produtoSelecionado.categoriaId : ""}
              control={control}
              render={({field}) => <Dropdown {...field} optionLabel="label" options={listaCategorias} onChange={(e)=>field.onChange(e.value)}  />}
            />
              
              <p className="p-error"> {errors.categoria?.message} </p>
          </div>
          <div className="p-field p-col-12 p-md-6">
          <label htmlFor="estoque" > Estoque </label>
          <Controller
              name="estoque"
              defaultValue={produtoSelecionado !== null ? produtoSelecionado.estoque : ""}
              control={control}
              render={({field}) =>  <InputNumber {...field} onChange={(e)=>field.onChange(e.value)}  />}
            />
             
              <p className="p-error"> {errors.estoque?.message} </p>
          </div>
          <div className="p-field p-col-12 p-md-6">
          <label htmlFor="preco" > Preço </label>
            <Controller
              name="preco"
              defaultValue={produtoSelecionado !== null ? produtoSelecionado.preco : ""}
              control={control}
              render={({field}) => <InputNumber {...field} onChange={(e)=>field.onChange(e.value)} mode="currency" currency="BRL" locale="pt-BR" />}
            />
              
              <p className="p-error"> {errors.preco?.message} </p>
          </div>
          <div className="p-field p-col-12 p-md-12">
              <label htmlFor="imagem" > Imagem URL </label>
              <InputText name="imagem" type="text" {...register("ImagemUrl")} defaultValue={produtoSelecionado !== null ? produtoSelecionado.imagemUrl : ""} />
          </div>
        </div>
      </form>
      <div className="p-d-flex p-jc-end">
        <Button label="Salvar" icon="pi pi-save" className="p-mr-2" type="submit" form="produtosForm" loading={requestLoading} loadingOptions={{ position: 'right' }} />
        <Button label="Voltar" icon="pi pi-times" onClick={()=>HandleCloseModal()}  className="p-button-danger p-button-outlined" />
      </div>
    </Dialog>
   
  </div>
  );
};

export default Produtos;
