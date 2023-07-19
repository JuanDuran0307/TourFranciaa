import { getPremios, addPremios, deletePremios, selectOne, updatePremios } from "./API.js";

document.addEventListener("DOMContentLoaded", ()=>{
    mostrarPremios();
});


//Read
async function mostrarPremios() {
    const premios = await getPremios();
    const contenedor = document.querySelector("tbody");
    premios.forEach(params => {
        const {_id,nombre,descripcion,ganador,equipo}= params;
        const rows = document.createElement('tr')
        rows.innerHTML = `

        <th>${_id}</th>
        <th>${nombre}</th>
        <th>${descripcion}</th>
        <th>${ganador}</th>
        <th>${equipo}</th>
        <th><button type="button" class="boton-Modal btn btn-outline-primary update" id="${_id}" data-bs-toggle="modal" data-bs-target="#exampleModal2">
        Updtade
        </button></th>
        <th><button type = "button" id="${_id}" class = "btn btn-outline-danger delete">Delete</button></th>
        
        `
        contenedor.append(rows)
        
    });
};


//Insert
const formulario = document.querySelector("#formAddPremios");
formulario.addEventListener("submit", insertPremio);

function insertPremio(e) {
  e.preventDefault();
  const nombre = document.querySelector("#nombre").value;
  const descripcion = document.querySelector("#descripcion").value;
  const ganador = document.querySelector("#ganador").value;
  const equipo = document.querySelector("#descripcion").value;

  const registro = {
    nombre,
    descripcion,
    ganador,
    equipo
  };


  if (validation(registro)) {
    alert("Todos los datos son obligatorios");
  }
  alert("Datos guardados correctamente.");
  return addPremios(registro);
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
        const idPremio = e.target.getAttribute("id");
        const confir = confirm("Desea eliminar este Premio?");
        if (confir) {
            deletePremios(idPremio);
        }
    }
}


//Read One
const infoCategoria = document.querySelector(".lista");
infoCategoria.addEventListener("click",getInfo);

async function getInfo(e){
    if (e.target.classList.contains("update")) {
        const id = e.target.getAttribute("id");
        const informacion = await selectOne(id);

        const {_id,nombre,descripcion,ganador, equipo} = informacion;

        const nombreEdit = document.querySelector('#nombreEdit');
        const descripcionEdit = document.querySelector('#descripcionEdit');
        const ganadorEdit = document.querySelector('#ganadorEdit');
        const equipoEdit = document.querySelector('#equipoEdit');
        const idEdit = document.querySelector('#idEdit');

        nombreEdit.value = nombre;
        descripcionEdit.value = descripcion;
        ganadorEdit.value = ganador;
        equipoEdit.value = equipo;
        idEdit.value = _id;
    }
};


//Update
const formEdit = document.querySelector("#formEditPremios");
formEdit.addEventListener('submit',actualizar)

function actualizar(e){
    e.preventDefault();
    const id = document.querySelector('#idEdit').value;
    const nombre = document.querySelector('#nombreEdit').value;
    const descripcion = document.querySelector('#descripcionEdit').value;
    const ganador = document.querySelector('#ganadorEdit').value;
    const equipo = document.querySelector('#equipoEdit').value;

    const datos ={
        nombre,
        descripcion,
        ganador,
        equipo
    }

    alert('Datos editados correctamente');

    return updatePremios(datos,id);
};