import { getEquipos, addEquipos, deleteEquipos, selectOne, updateEquipos } from "./API.js";

document.addEventListener("DOMContentLoaded", ()=>{
    loadEquipo();
});


//Read
async function loadEquipo() {
    const equipos = await getEquipos();
    const contenedor = document.querySelector("tbody");
    equipos.forEach(params => {
        const {_id,nombre,pais,presidente}= params;
        const rows = document.createElement('tr')
        rows.innerHTML = `

        <th>${_id}</th>
        <th>${nombre}</th>
        <th>${pais}</th>
        <th>${presidente}</th>
        <th><button type="button" class="boton-Modal btn btn-outline-primary update" id="${_id}" data-bs-toggle="modal" data-bs-target="#exampleModal2">
        Updtade
        </button></th>
        <th><button type = "button" id="${_id}" class = "btn btn-outline-danger delete">Delete</button></th>
        
        `
        contenedor.append(rows)
        
    });
};


//Insert
const formulario = document.querySelector("#formAddEquipos");
formulario.addEventListener("submit", insertEquipo);

function insertEquipo(e) {
  e.preventDefault();
  const nombre = document.querySelector("#nombre").value;
  const pais = document.querySelector("#pais").value;
  const presidente = document.querySelector("#presidente").value;

  const registro = {
    nombre,
    pais,
    presidente
  };


  if (validation(registro)) {
    alert("Todos los datos son obligatorios");
  }
  alert("Datos guardados correctamente.");
  return addEquipos(registro);
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
        const idEquipo = e.target.getAttribute("id");
        const confir = confirm("Desea eliminar este Equipo?");
        if (confir) {
            deleteEquipos(idEquipo);
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

        const {_id,nombre,pais,presidente} = informacion;

        const nombreEdit = document.querySelector('#nombreEdit');
        const paisEdit = document.querySelector('#paisEdit');
        const presidenteEdit = document.querySelector('#presidenteEdit');
        const idEdit = document.querySelector('#idEdit');

        nombreEdit.value = nombre;
        paisEdit.value = pais;
        presidenteEdit.value = presidente;
        idEdit.value = _id;
    }
};


//Update
const formEdit = document.querySelector("#formEditEquipos");
formEdit.addEventListener('submit',actualizar)

function actualizar(e){
    e.preventDefault();
    const id = document.querySelector('#idEdit').value;
    const nombre = document.querySelector('#nombreEdit').value;
    const pais = document.querySelector('#paisEdit').value;
    const presidente = document.querySelector('#presidenteEdit').value;

    const datos ={
        nombre,
        pais,
        presidente
    }

    alert('Datos editados correctamente');

    return updateEquipos(datos,id);
};