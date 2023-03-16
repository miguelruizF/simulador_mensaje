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
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            // console.log("Esta vacio");
            return;
        }
        if(e.target.id === "email" && !validarEmail(e.target.value)){
            mostrarAlerta(`El ${e.target.id} no es valido`, e.target.parentElement);
            return;
        }
        limpiarAlerta(e.target.parentElement);
    }

    function mostrarAlerta(value, referencia){
        limpiarAlerta(referencia)
        //Comprobar si existe la alerta
        const alerta = referencia.querySelector(".bg-red-600");
        if(alerta){
            alerta.remove();
        }
        
        const error = d.createElement("p");
        error.classList.add("bg-red-600","text-white","p-2","text-center");
        error.textContent = value;

        //Inyectar el error
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector(".bg-red-600");
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
        const resultado = regex.test(email);
        return resultado;
    }
});