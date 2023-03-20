const d = document;

d.addEventListener("DOMContentLoaded", ()=> {
    //Seleccionar elementos
    const inputEmail = d.querySelector("#email");
    const inputAsunto = d.querySelector("#asunto");
    const inputMensaje = d.querySelector("#mensaje");
    const form = d.querySelector("#formulario");
    const btnSubmit = d.querySelector("#formulario button[type='submit']");
    const btnReset = d.querySelector("#formulario button[type='reset']");
    const spinner = d.querySelector("#spinner");

    const email = {
        email: "",
        asunto: "",
        mensaje: "",
    }
    // console.log(inputMensaje);

    //Asignar eventos
    inputEmail.addEventListener("input",validar);
    inputAsunto.addEventListener("input", validar);
    inputMensaje.addEventListener("input", validar);
    btnReset.addEventListener("click", (e)=>{
        e.preventDefault();
        //Reiniciar el objeto
        resetFormulario();
    });

    form.addEventListener("submit", enviarEmail);

    function validar(e) {
        if(e.target.value.trim() === ""){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            // console.log("Esta vacio");
            email[e.target.name] = "";
            comprobarEmail();
            return;
        }
        if(e.target.id === "email" && !validarEmail(e.target.value)){
            mostrarAlerta(`El ${e.target.id} no es valido`, e.target.parentElement);
            email[e.target.name] = "";
            comprobarEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement);

        //Asignar valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        // console.log(email);
        
        //Comprobar el objeto de email
        comprobarEmail();
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

    function comprobarEmail(){
        // console.log(email);
        if(Object.values(email).includes("")){
            btnSubmit.classList.add("opacity-50");
            btnSubmit.disable = true;
            return;
        }
        btnSubmit.classList.remove("opacity-50");
        btnSubmit.disabled = false;
    }

    function enviarEmail(e){
        e.preventDefault();
        spinner.classList.add("flex");
        spinner.classList.remove("hidden"); 

        setTimeout(() => {
            spinner.classList.remove("flex");
            spinner.classList.add("hidden");

            resetFormulario();

            //Crear alerta de envio
            const alertaExito = d.createElement("p");
            alertaExito.classList.add("bg-green-500", "text-white", "p-2", "text-center", "rounded-lg", "mt-10", "font-bold", "text-sm", "uppercase");
            alertaExito.textContent = "Mensaje enviado correctamente";
            form.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }

    function resetFormulario(){
        email.email = "";
        email.asunto = "";
        email.mensaje = "";
        form.reset();
        comprobarEmail();
    }
});