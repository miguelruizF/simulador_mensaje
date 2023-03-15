const d = document;

d.addEventListener("DOMContentLoaded", ()=> {
    //Seleccionar elementos
    const inputEmail = d.querySelector("#email");
    const inputAsunto = d.querySelector("#asunto");
    const inputMensaje = d.querySelector("#mensaje");
    const form = d.querySelector("form");
    // console.log(inputMensaje);

    //Asignar eventos
    inputEmail.addEventListener("blur",validar);
    inputAsunto.addEventListener("blur", validar);
    inputMensaje.addEventListener("blur", validar);

    function validar(e) {
        if(e.target.value.trim() === ""){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`);
            // console.log("Esta vacio");
        }else{
            // console.log("No esta vacio");
        }
    }

    function mostrarAlerta(value){
        const error = d.createElement("p");
        error.classList.add("bg-red-600","text-white","p-2","text-center");
        error.textContent = value;

        //Inyectar el error
        form.appendChild(error);
    }
});