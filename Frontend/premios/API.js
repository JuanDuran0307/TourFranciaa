const urlAll = "http://localhost:5000/api/premios/all";
const urlAdd = "http://localhost:5000/api/premios/add";
const urlDelete = "http://localhost:5000/api/premios/del";
const urlOne = "http://localhost:5000/api/premios/one";
const urlUpdate = "http://localhost:5000/api/premios/upd";

//Read
export const getPremios = async () =>{
    try {
        const premios = await fetch(urlAll);
        const infoPremios = premios.json();
        return infoPremios;
    } catch (error) {
        console.log(error);
    }
}

//Insert
export const addPremios = async (registro) => {
    try {
      await fetch(`${urlAdd}/`, {
        method: "POST",
        body: JSON.stringify(registro),
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location = "premios.html";
    } catch (error) {
        console.log(error);
    }
};

//Delete
export const deletePremios = async (id) =>{
    try {
        await fetch(`${urlDelete}/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type":"application/json",
            }
        });
        window.location.href = "premios.html"
    } catch (error) {
        console.log(error);
    }
};

//Read One
export const selectOne = async(id) => {
    try {
        const response = await fetch(`${urlOne}/${id}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
};

//Update
export async function updatePremios(data,id){
    try {
            await fetch(`${urlUpdate}/${id}`,{
            method: "PUT",
            body: JSON.stringify(data),
            headers:{
                'Content-Type':"application/json",
            },
        });
        window.location.href = "premios.html"
    } catch (error) {
        console.log(error);
    }
};