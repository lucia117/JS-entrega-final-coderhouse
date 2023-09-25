// Función para calcular el IMC y su estado correspondiente
function calcIMC(persona) {
    let estado;
    altura = persona.altura / 100;
    const imc = parseFloat(persona.pesoActual / (altura * altura)).toFixed(2);

    if (imc < 16.5) {
        estado = 'Desnutrición o anorexia';
    } else if (imc >= 16.5 && imc < 18.5) {
        estado = 'Bajo peso';
    } else if (imc >= 18.5 && imc < 25) {
        estado = 'Peso normal';
    } else if (imc >= 25 && imc < 30) {
        estado = 'Sobrepeso';
    } else if (imc >= 30 && imc < 35) {
        estado = 'Obesidad clase I';
    } else if (imc >= 35 && imc < 40) {
        estado = 'Obesidad clase II';
    } else {
        estado = 'Obesidad clase III';
    }
    return [imc, estado];
}

// Función para calcular el peso ideal
function calcPesoIdeal(persona) {
    const result = file.tablaPesosyContextura.find((ele) => ele.Altura >= persona.altura && ele.Sexo === persona.sexo.slice(0, 1) && ele.ContexturaFisica === persona.contextura);
    return result.Medio;
}

// Función para calcular el peso posible
function calcPesoPosible(persona, pesoIdeal) {
    const edad = calcularEdad(persona.fechaNacimiento);
    let kg1 = (edad > 20) ? (edad - 20) / 10 : 0;
    let kg2 = persona.anioSobrepeso / 10;
    let kg3 = (persona.pesoActual - pesoIdeal) / 10;
    let kg4 = (persona.pesoActual > 100) ? ((persona.pesoActual - 100) * 2) / 10 : 0;
    return Number(pesoIdeal) + Number(kg1) + Number(kg2) + Number(kg3) + Number(kg4);
}