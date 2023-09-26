const EMAIL = localStorage.getItem("email")
const myModal = new bootstrap.Modal(document.getElementById('registoModal'))
const registrarPesoModal = new bootstrap.Modal(document.getElementById('registrarPesoModal'))

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

// Asignar funciones a los botones
document.getElementById("btn-cargar-inicial").addEventListener("click", (e) => cargarInfoInicial());
document.getElementById("btn-modal-peso").addEventListener("click", (e) => registrarPesoModal.show());
document.getElementById("btn-guardar-registro").addEventListener("click", (e) => cargarnNuevoRegistro());
document.getElementById("btn-salir").addEventListener("click", (e) => cerrarSesion());



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
    guardarInformacionDbUsuario(EMAIL, persona, myModal)
}

//Funcion para cargar pagina principa
function cargarPaginaPrincipal() {
    if (localStorage.getItem("email")) {
        obtenerInformacionUsuario(EMAIL).then(result => {
            localStorage.setItem(EMAIL, JSON.stringify(result))
            if (JSON.stringify(result) !== '{}') {
                cargarInformacionPersonal();
                generarTabla();
                generarGrafica();
            } else {
                myModal.show();
            }
        });
    } else {
        window.location.href = "../index.html";
    }
}

//Funcion para cargar un peso 
function cargarnNuevoRegistro() {
    let peso = document.getElementById("registro-peso").value;
    let fecha = document.getElementById("fecha-peso").value;
    if (peso !== "" && fecha !== "") {
        if (fecha >= new Date().toISOString().split('T')[0]) {
            let dataStorage = JSON.parse(localStorage.getItem(EMAIL))
            let imc = calcIMC({ ...dataStorage, pesoActual: peso })
            dataStorage.historialPeso = handlerRegistroPeso(fecha, dataStorage.historialPeso, peso, imc);
            localStorage.setItem(EMAIL, JSON.stringify(dataStorage));
            actualizarInformacionUsuario(EMAIL, dataStorage, registrarPesoModal);
        } else {
            Swal.fire('Error', 'La fecha no debe ser menor a hoy.', 'error');
        }
    } else {
        Swal.fire('Error', 'Debe completar el formulario.', 'error');
    }
}

//Funcion que muestra el historial de pesos
function generarTabla() {
    const data = JSON.parse(localStorage.getItem(EMAIL))
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

    const data = JSON.parse(localStorage.getItem(EMAIL))
    const registroPeso = data.historialPeso[data.historialPeso.length - 1]
    //saludo 
    document.getElementById("saludo").textContent = "Hola " + data.nombre[0].toUpperCase() + data.nombre.substring(1) + "!";

    //ultimo peso registrado
    document.getElementById("ultimo-peso").textContent = registroPeso.peso + " Kg";
    document.getElementById("fecha-ultimo-peso").textContent = formatearFecha(registroPeso.fecha);

    //IMC
    document.getElementById("imc").textContent = registroPeso.imc[0] + " Kg/m²";
    document.getElementById("tipo-imc").textContent = registroPeso.imc[1];

    //Peso ideal
    document.getElementById("peso-ideal").textContent = data.pesoIdeal + " Kg";

    //peso posible
    document.getElementById("peso-posible").textContent = (parseFloat(data.pesoPosible) - 1).toFixed(2) + "-" + (parseFloat(data.pesoPosible) + 1).toFixed(2) + "Kg";
}

//Funcion para generar la grafica
function generarGrafica() {

    const data = JSON.parse(localStorage.getItem(EMAIL))
    const dataHistorial = data.historialPeso;

    let mayorPeso = parseInt(data.historialPeso[0].peso);
    const pesoIdeal = parseInt(data.pesoIdeal);

    const pesos = [];
    const fechas = [];

    dataHistorial.forEach(item => {
        if (item.peso) {
            if (parseFloat(item.peso) > parseFloat(mayorPeso)) { mayorPeso = item.peso }
            pesos.push(parseFloat(item.peso));
        }
        if (item.fecha) {
            fechas.push(formatearFecha(item.fecha));
        }
    });

    var areaData = {

        labels: fechas,
        datasets: [
            {
                data: pesos,
                borderColor: [
                    '#4747A1'
                ],
                borderWidth: 4,
                fill: false,
                label: "Orders"
            }
        ]
    };
    var areaOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            filler: {
                propagate: false
            }
        },
        scales: {
            xAxes: [{
                display: true,
                ticks: {
                    display: true,
                    padding: 10,
                    fontColor: "#6C7383"
                },
                gridLines: {
                    display: false,
                    drawBorder: false,
                    color: 'transparent',
                    zeroLineColor: '#eeeeee'
                }
            }],
            yAxes: [{
                display: true,
                ticks: {
                    display: true,
                    autoSkip: false,
                    maxRotation: 90,
                    stepSize: 5,
                    min: parseInt(pesoIdeal),
                    max: parseInt(mayorPeso),
                    padding: 18,
                    fontColor: "#6C7383"
                },
                gridLines: {
                    display: true,
                    color: "#f2f2f2",
                    drawBorder: false
                }
            }]
        },
        legend: {
            display: false
        },
        tooltips: {
            enabled: true
        },
        elements: {
            line: {
                tension: .35
            },
            point: {
                radius: 0
            }
        }
    }
    var revenueChartCanvas = $("#order-chart").get(0).getContext("2d");
    var revenueChart = new Chart(revenueChartCanvas, {
        type: 'line',
        data: areaData,
        options: areaOptions
    });


}

//Funcion para manejar el historial de peso
function handlerRegistroPeso(fecha, historial, peso, imc) {
    let cambio = false;

    //Verifico si ya existe el registro, si existe, sobrescribo el peso
    for (let i = 0; i < historial.length; i++) {
        if (historial[i].fecha === fecha) {
            cambio = true;
            historial[i].peso = peso;
            historial[i].imc = imc;
        }
    }
    // si no existe, creo un nuevo registro
    if (!cambio) {
        historial.push({
            peso,
            fecha,
            imc
        })
    }

    //ordeno los registros por fecha
    historial = ordenarHistorialPorFecha(historial)

    return historial;
}

function ordenarHistorialPorFecha(historial) {
    let historialOrdenado = historial.sort((a, b) => {
        const fechaA = new Date(a.fecha);
        const fechaB = new Date(b.fecha);
        return fechaA - fechaB;
    });

    return historialOrdenado
}

function cerrarSesion() {
    localStorage.removeItem(EMAIL);
    localStorage.removeItem("email");
    window.location.href = "../index.html";
}