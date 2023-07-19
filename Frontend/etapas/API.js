const urlAll = "http://localhost:5000/api/etapas/all";
const urlAdd = "http://localhost:5000/api/etapas/add";
const urlDelete = "http://localhost:5000/api/etapas/del";
const urlOne = "http://localhost:5000/api/etapas/one";
const urlUpdate = "http://localhost:5000/api/etapas/upd";

//Read
export const getEtapas = async () =>{
    try {
        const etapas = await fetch(urlAll);
        const infoEtapas = etapas.json();
        return infoEtapas;
    } catch (error) {
        console.log(error);
    }
}

//Insert
export const addEtapas = async (registro) => {
    try {
      await fetch(`${urlAdd}/`, {
        method: "POST",
        body: JSON.stringify(registro),
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location = "etapas.html";
    } catch (error) {
        console.log(error);
    }
};

//Delete
export const deleteEtapas = async (id) =>{
    try {
        await fetch(`${urlDelete}/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type":"application/json",
            }
        });
        window.location.href = "etapas.html"
    } catch (error) {
        console.log(error);
    }
};

//Read One
export const selectOne = async (id)=>{
    try {
        const response = await fetch(`${urlOne}/${id}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
};

//Update
export async function updateEtapas(data,id){
    try {
            await fetch(`${urlUpdate}/${id}`,{
            method: "PUT",
            body: JSON.stringify(data),
            headers:{
                'Content-Type':"application/json",
            },
        });
        window.location.href = "etapas.html"
    } catch (error) {
        console.log(error);
    }
};