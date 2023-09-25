//Funcion que formatea una fecha al formato "dd/mm/yyyy".
function formatearFecha(fecha) {
    const [año, mes, dia] = fecha.split('T')[0].split('-');

    return `${dia}/${mes}/${año}`;
}

function calcularEdad(fechaNacimiento) {
    const fechaNacimientoObj = new Date(fechaNacimiento);

    const fechaActual = new Date();

    const diferenciaMilisegundos = fechaActual - fechaNacimientoObj;

    const milisegundosEnUnAnio = 1000 * 60 * 60 * 24 * 365.25; // Incluye años bisiestos
    const edad = diferenciaMilisegundos / milisegundosEnUnAnio;

    // Redondea la edad hacia abajo
    const edadRedondeada = Math.floor(edad);

    return edadRedondeada;
}

