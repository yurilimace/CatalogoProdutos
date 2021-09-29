import React,{useState} from "react";
import { useEffect } from "react/cjs/react.development";
import { ObterCategorias, AdicionarCategoria,ExcluirCategoria,EditarCategoria } from "../../services/Categorias/categoriasServices";
import {CategoriaSchema} from "../../Schemas/CategoriaSchema"
import { DataTable } from 'primereact/datatable';
import {Button} from "primereact/button"
import { Column } from "primereact/column";
import { Dialog } from 'primereact/dialog';
import {InputText} from 'primereact/inputtext'
import { useForm,Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";
const Categorias = () => {
  const [listaCategorias,setListaCategorias] = useState([]);
  const [showDialogModal,setShowDialogModal] = useState(false);
  const [requestLoading,setRequestLoding] = useState(false);
  const [categoriaSelecionada,setCategoriaSelecionada] = useState(null)

  const {register,handleSubmit,reset,formState:{errors}} = useForm({
    resolver:yupResolver(CategoriaSchema)
  })

  const ObterTodasCategorias = async () => {
    const {data} = await ObterCategorias();
   
    setListaCategorias(data)
  }

  const HandleSelectCategoria = (categoria) =>{
   
    setCategoriaSelecionada(categoria)
    setShowDialogModal(true)
  }

  const HandleCloseModal = () => {
    setShowDialogModal(false)
    reset()
    setCategoriaSelecionada(null)
  }

  const DeletarCategoria = async (id) => {
    const data = await ExcluirCategoria(id)
    if(data.status === 204){
      toast.success("Sucesso ao deletar categoria",{
        autoClose:2000,
        onClose:() => {
          ObterTodasCategorias()
        }
      })
    }
  }

  const OnSubmit = async (data) =>{
    setRequestLoding(true)
    const responseData = categoriaSelecionada.categoriaId === undefined ? await AdicionarCategoria(data) : await EditarCategoria(categoriaSelecionada.categoriaId,data)
    console.log(responseData)
    if(responseData.status === 200){
      toast.success(categoriaSelecionada === null ? "Sucesso ao salvar categoria": "Sucesso ao editar categoria",{
        autoClose:2000,
        onClose:() =>{
          setRequestLoding(false)
          HandleCloseModal()
          reset()
          ObterTodasCategorias()
        }
      })
    }
  }

  useEffect(()=>{
    ObterTodasCategorias();
  },[])

  return <div className="p-d-flex p-flex-column">
     <div>
      <Button label="Adicionar" icon="pi pi-plus" onClick={()=>setShowDialogModal(true)}/>
    </div>
    <div className="p-mt-3">
      <DataTable value={listaCategorias}>
        <Column field="categoriaId" header="Id"></Column>
        <Column field="nome" header="Nome"></Column>
        <Column header="Ações" body={(rowData) =><div>
        <Button icon="pi pi-trash"  className="p-button-text p-button-danger p-mr-2"  onClick={()=>DeletarCategoria(rowData.categoriaId)} />
        <Button icon="pi pi-pencil" className="p-button-text " onClick={()=>HandleSelectCategoria(rowData)} />
      </div>} ></Column>
      </DataTable>
    </div>
    <Dialog visible={showDialogModal} onHide={()=> setShowDialogModal(false)} closable={false} header="Adicionar Categoria">
     
      <form id="categoriaForm" onSubmit={handleSubmit(OnSubmit)}>
        <div className="p-fluid p-formgrid p-grid" >
          <div className="p-field p-col-12 p-md-6 ">
              <label htmlFor="nome" > Nome </label>
              <InputText name="nome" type="text" defaultValue={categoriaSelecionada !== null ? categoriaSelecionada.nome : "" } {...register("nome")} />
              <p className="p-error"> {errors.nome?.message} </p>
          </div>
          <div className="p-field p-col-12 p-md-12">
              <label htmlFor="imagem" > Imagem URL </label>
              <InputText name="imagem" type="text" defaultValue={categoriaSelecionada !== null ? categoriaSelecionada.imagemUrl : "" } {...register("ImagemUrl")} />
              <p className="p-error"> {errors.ImagemUrl?.message} </p>
          </div>
        </div>
      </form>
      <div className="p-d-flex p-jc-end">
        <Button label="Salvar" icon="pi pi-save"  type="submit" form="categoriaForm" className="p-mr-2" loading={requestLoading} loadingoptions={{position:'right'}}  />
        <Button label="Voltar" icon="pi pi-times" onClick={()=> HandleCloseModal()}  className="p-button-danger p-button-outlined" />
      </div>
    </Dialog>
  </div>;
};

export default Categorias;
