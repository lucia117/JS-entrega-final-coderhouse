const EMAIL = localStorage.getItem("email")


// Definición de la clase Persona para almacenar los datos del usuario
function Persona({ nombre, sexo, fechaNacimiento, altura, pesoActual, aniosSobrepeso, contextura }) {
    this.nombre = nombre;
    this.sexo = sexo;
    this.fechaNacimiento = fechaNacimiento;
    this.altura = altura;
    this.pesoActual = pesoActual;
    this.anioSobrepeso = aniosSobrepeso;
    this.contextura = contextura;

}

cargarPaginaPrincipal()


document.getElementById("btn-cargar-inicial").addEventListener("click", (e) => {
    cargarInfoInicial();
});



function cargarInfoInicial() {
    var nombre = document.getElementById("nombre-modal").value;
    var fechaNacimiento = document.getElementById("fechaNacimiento-modal").value;
    var sexo = document.getElementById("sexo-modal").value;
    var altura = document.getElementById("altura-modal").value;
    var contextura = document.getElementById("contextura-modal").value;
    var pesoActual = document.getElementById("pesoActual-modal").value;
    var aniosSobrepeso = document.getElementById("aniosSobrepeso-modal").value;

    // Validar que los campos no estén vacíos
    if (
        nombre === "" ||
        fechaNacimiento === "" ||
        sexo === "" ||
        altura === "" ||
        contextura === "" ||
        pesoActual === "" ||
        aniosSobrepeso === ""
    ) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Falta cargar algún dato',
        })
        return
    }

    let persona = new Persona({ nombre, sexo, fechaNacimiento, altura, pesoActual, aniosSobrepeso, contextura });
    // Calcular el IMC, peso ideal y peso posible
    let imc = calcIMC(persona);
    persona.pesoIdeal = calcPesoIdeal(persona);
    persona.pesoPosible = calcPesoPosible(persona, persona.pesoIdeal).toFixed(2);
    persona.historialPeso = [{ fecha: new Date().toISOString().split('T')[0], peso: persona.pesoActual, imc }]
    guardarInformacionUsuario(EMAIL, persona, myModal)
}


//Funcion para cargar pagina principa
function cargarPaginaPrincipal() {
    if (EMAIL !== null) {
        obtenerInformacionUsuario(EMAIL).then(result => {
            localStorage.setItem("data", JSON.stringify(result))

            cargarInformacionPersonal();
            generarTabla();
        });
    } else {
        //abro modal
        var myModal = new bootstrap.Modal(document.getElementById('registoModal'))
        myModal.show();
    }
}

// Agregar un evento de escucha al formulario para manejar el envío
/* document.querySelector("#form-calculo").addEventListener("submit", (e) => {
    e.preventDefault();
    mostrarInformacionNutricional();
});
 */
//Sale de la pagina principal
/* document.getElementById("btn-salir").addEventListener("click", (e) => {
    window.location.href = "./index.html";
});
 */
// Función para mostrar la información nutricional después de la validación
function mostrarInformacionNutricional() {
    // Obtener los valores de los inputs
    let sexo = document.querySelector("#sexo-input").value;
    let edad = parseInt(document.querySelector("#edad-input").value);
    let altura = parseFloat(document.querySelector("#altura-input").value);
    let contextura = document.querySelector("#contextura-input").value;
    let pesoActual = parseFloat(document.querySelector("#peso-input").value);
    let anioSobrepeso = parseInt(document.querySelector("#anios-input").value);

    // Validar las entradas del usuario
    if (!validarEntradas(edad, contextura, pesoActual, anioSobrepeso)) {
        alert("Por favor, ingresa valores válidos.");
        return;
    }

    // Calcular el IMC, peso ideal y peso posible
    let imc = calcIMC(persona);
    let pesoIdeal = calcPesoIdeal(persona);
    let pesoPosible = calcPesoPosible(persona, pesoIdeal);

    let persona = new Persona({ sexo, edad, altura, pesoActual, anioSobrepeso, contextura, imc, pesoIdeal, pesoPosible });



    location.reload();
}

// Función para validar las entradas del usuario
function validarEntradas(fechaNacimiento, contextura, peso, anios) {
    const fechaNacimientoValid = fechaNacimiento && !isNaN(fechaNacimiento) && fechaNacimiento >= 10;
    const contexturaValid = contextura && contextura.trim() !== "";
    const pesoValid = peso && !isNaN(peso) && peso > 0;
    const aniosValid = anios && !isNaN(anios) || anios > 0;

    return fechaNacimientoValid && contexturaValid && pesoValid && aniosValid;
}


document.getElementById("btn-guardar-registro").addEventListener("click", (e) => {
    //Valido si no esta vacio 
    let peso = document.getElementById("registro-peso").value;
    let fecha = document.getElementById("fecha-peso").value;
    if (peso !== "" && fecha !== "") {
        cargarnNuevoRegistro(peso, fecha);
    } else {
        Swal.fire('Error', 'Debe completar el formulario.', 'error');
    }
});


//Funcion para cargar un peso 
function cargarnNuevoRegistro(peso, fecha) {
    let dataStorage = JSON.parse(localStorage.getItem("data"))

    console.log(dataStorage)
    let imc = calcIMC({ ...dataStorage.data, pesoActual: peso })
    dataStorage.historialPeso.push({
        peso,
        fecha: new Date(),
        imc
    })
    localStorage.setItem(EMAIL, JSON.stringify(dataStorage));
    location.reload();
}


//Funcion que muestra el historial de pesos
function generarTabla() {
    const data = JSON.parse(localStorage.getItem("data"))
    const historial = data.historialPeso;
    const table = document.getElementById("tableBody");
    let rows = "";
    for (let i = 0; i < historial.length; i++) {
        let fecha = formatearFecha(historial[i].fecha);
        let row = `<tr>
                    <td>${fecha}</td>
                    <td>${historial[i].peso} Kg </td>
                    <td>${historial[i].imc[0]} Kg/m²</td>
                </tr>`;
        rows += row;
    }
    table.innerHTML = rows;
}


//Funcion para cargar datos personales
function cargarInformacionPersonal() {

    const data = JSON.parse(localStorage.getItem("data"))
    //ultimo peso registrado
    document.getElementById("ultimo-peso").textContent = data.historialPeso[data.historialPeso.length - 1].peso;
    document.getElementById("fecha-ultimo-peso").textContent = formatearFecha(data.historialPeso[data.historialPeso.length - 1].fecha);

    //IMC
    document.getElementById("imc").textContent = data.imc[0] + " Kg/m²";
    document.getElementById("tipo-imc").textContent = data.imc[1];

    //Peso ideal
    document.getElementById("peso-ideal").textContent = data.pesoIdeal + " Kg";

    //peso posible
    document.getElementById("peso-posible").textContent = (parseFloat(data.pesoPosible) - 1).toFixed(2) + "-" + (parseFloat(data.pesoPosible) + 1).toFixed(2) + "Kg";
}


