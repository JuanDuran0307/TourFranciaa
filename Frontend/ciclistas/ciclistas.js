import { getCiclistas, addCiclistas, deleteCiclistas, selectOne, updateCiclistas } from "./API.js";

document.addEventListener("DOMContentLoaded", ()=>{
    loadCiclistas();
});


//Read
async function loadCiclistas() {
    const eliminar = document.querySelector(".lista");
    const ciclistas = await getCiclistas();
    eliminar.addEventListener("click",borrar);
    const contenedor = document.querySelector("tbody");
    ciclistas.forEach(params => {
        const {_id,nombre,equipo,nacionalidad}= params;
        const rows = document.createElement('tr')
        rows.innerHTML = `

        <th>${_id}</th>
        <th><${nombre}</th>
        <th>${equipo}</th>
        <th>${nacionalidad}</th>
        <th><button type="button" class="boton-Modal btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2" detalle= "">
        Updtade
        </button></th>
        <th><button type = "button" id="${_id}" class = "btn btn-outline-danger delete">Delete</button></th>
        
        `
        contenedor.append(rows)
        
    });
};


//Insert
const formulario = document.querySelector("#formAddCiclistas");
formulario.addEventListener("submit", insertCiclista);

function insertCiclista(e) {
  e.preventDefault();
  const nombre = document.querySelector("#nombre").value;
  const equipo = document.querySelector("#equipo").value;
  const nacionalidad = document.querySelector("#nacionalidad").value;
  const edad = document.querySelector("#edad").value;

  const registro = {
    nombre,
    equipo,
    nacionalidad,
    edad
  };


  if (validation(registro)) {
    alert("Todos los datos son obligatorios");
  }
  alert("Datos guardados correctamente.");
  return addCiclistas(registro);
};

function validation(Objeto) {
  return !Object.values(Objeto).every((element) => element !== "");
};


//Delete
const eliminar = document.querySelector("main");
eliminar.addEventListener("click",borrar);

function borrar(e){
    if (e.target.classList.contains("eliminar")) {
        console.log(e.target);
        const idCiclista = e.target.getAttribute("id");
        const confir = confirm("Desea eliminar este Ciclista?");
        if (confir) {
            deleteCiclistas(idCiclista);
        }
    }
}


//Read One
const infoCategoria = document.querySelector("main");
infoCategoria.addEventListener("click",getInfo);

async function getInfo(e){
    if (e.target.classList.contains("update")) {
        const id = e.target.getAttribute("id");
        const informacion = await selectOne(id);

        const {_id,nombre,equipo,nacionalidad, edad} = informacion;

        const nombreEdit = document.querySelector('#nombreEdit');
        const equipoEdit = document.querySelector('#equipoEdit');
        const nacionalidadEdit = document.querySelector('#nacionalidadEdit');
        const edadEdit = document.querySelector('#edadEdit');
        const idEdit = document.querySelector('#idEdit');

        nombreEdit.value = nombre;
        equipoEdit.value = equipo;
        nacionalidadEdit.value = nacionalidad;
        edadEdit.value = edad;
        idEdit.value = _id;
    }
};


//Update
const formEdit = document.querySelector("#formEditCiclista");
formEdit.addEventListener('submit',actualizar)

function actualizar(e){
    e.preventDefault();
    const id = document.querySelector('#idEdit').value;
    const nombre = document.querySelector('#nombreEdit').value;
    const equipo = document.querySelector('#equipoEdit').value;
    const nacionalidad = document.querySelector('#nacionalidadEdit').value;
    const edad = document.querySelector('#edadEdit').value;

    const datos ={
        nombre,
        equipo,
        nacionalidad,
        edad
    }

    alert('Datos editados correctamente');

    return updateCiclistas(datos,id);
};