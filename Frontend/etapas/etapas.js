import {getEtapas, addEtapas, deleteEtapas, selectOne, updateEtapas } from "./API.js";

document.addEventListener("DOMContentLoaded", ()=>{
    mostrarEtapas();
});


//Read
async function mostrarEtapas() {
    const etapas = await getEtapas();
    const contenedor = document.querySelector("tbody");
    etapas.forEach(params => {
        const {_id,numero,fecha,inicio,fin,tipo}= params;
        const rows = document.createElement('tr')
        rows.innerHTML = `

        <th>${_id}</th>
        <th>${numero}</th>
        <th>${fecha}</th>
        <th>${inicio}</th>
        <th>${fin}</th>
        <th>${tipo}</th>
        <th><button type="button" class="boton-Modal btn btn-outline-primary update" id="${_id}" data-bs-toggle="modal" data-bs-target="#exampleModal21">
        Updtade
        </button></th>
        <th><button type = "button" id="${_id}" class = "btn btn-outline-danger delete">Delete</button></th>
        
        `
        contenedor.append(rows)
        
    });
};


//Insert
const formulario = document.querySelector("#formAddEtapas");
formulario.addEventListener("submit", insertEtapas);

function insertEtapas(e) {
  e.preventDefault();
  const numero = document.querySelector("#numero").value;
  const fecha = document.querySelector("#fecha").value;
  const inicio = document.querySelector("#inicio").value;
  const fin = document.querySelector("#fin").value;
  const tipo = document.querySelector("#tipo").value;

  const registro = {
    numero,
    fecha,
    inicio,
    fin,
    tipo
  };


  if (validation(registro)) {
    alert("Todos los datos son obligatorios");
  }
  alert("Datos guardados correctamente.");
  return addEtapas(registro);
};

function validation(Objeto) {
  return !Object.values(Objeto).every((element) => element !== "");
};


//Delete
const eliminar = document.querySelector("tbody");
eliminar.addEventListener("click",borrar);

function borrar(e){
    if (e.target.classList.contains("delete")) {
        console.log(e.target);
        const idEtapa = e.target.getAttribute("id");
        const confir = confirm("Desea eliminar esta Etapa?");
        if (confir) {
            deleteEtapas(idEtapa);
        }
    }
}


//Read One
const infoEtapas = document.querySelector(".lista");
infoEtapas.addEventListener("click",getInfo);

async function getInfo(e){
    if (e.target.classList.contains("update")) {
        const id = e.target.getAttribute("id");
        const informacion = await selectOne(id);

        const {_id,numero,fecha,inicio, fin,tipo} = informacion;
        const numeroEdit = document.querySelector('#numeroEdit');
        const fechaEdit = document.querySelector('#fechaEdit');
        const inicioEdit = document.querySelector('#inicioEdit');
        const finEdit = document.querySelector('#finEdit');
        const tipoEdit = document.querySelector('#tipoEdit');
        const idEdit = document.querySelector('#idEdit');

        numeroEdit.value = numero;
        fechaEdit.value = fecha;
        inicioEdit.value = inicio;
        finEdit.value = fin;
        tipoEdit.value = tipo;
        idEdit.value = _id;

        console.log(informacion);
    }

}; 


//Update
const formEdit = document.querySelector("#formEditEtapas");
formEdit.addEventListener('submit',actualizar);

function actualizar(e){
    e.preventDefault();
    const id = document.querySelector('#idEdit').value;
    const numero = document.querySelector('#numeroEdit').value;
    const fecha = document.querySelector('#fechaEdit').value;
    const inicio = document.querySelector('#inicioEdit').value;
    const fin = document.querySelector('#finEdit').value;
    const tipo = document.querySelector('#tipoEdit').value;

    const datos ={
        numero,
        fecha,
        inicio,
        fin,
        tipo
    }

    alert('Datos editados correctamente');

    return updateEtapas(datos, id);
};