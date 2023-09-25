// Mostrar el aviso modal cuando se carga la página
var myModal = new bootstrap.Modal(document.getElementById("avisoModal"), {});
document.onreadystatechange = function () {
    myModal.show();
};

// Asignar funciones a los botones
document.getElementById("btn-iniciar").onclick = function () { iniciarSesion() };
document.getElementById("btn-registrar").onclick = function () { registrarUsuario() };
document.getElementById("btn-recuperar-contrasena").onclick = function () { recuperarContrasena() };

// Función para iniciar sesión
function iniciarSesion() {
    // Obtener los valores del formulario
    const email = document.querySelector("#email-login").value;
    const password = document.querySelector("#password-login").value;

    iniciarSesionFirebase(email, password)
}

// Función para registrar un nuevo usuario
function registrarUsuario() {
    var correo = document.getElementById('correo').value;
    var contrasena = document.getElementById('contrasena').value;
    var repetirContrasena = document.getElementById('repetirContrasena').value;

    // Validar que todos los campos estén llenos
    if (correo === '' || contrasena === '' || repetirContrasena === '') {
        Swal.fire('Error', 'Por favor, complete todos los campos.', 'error');
        return false;
    }

    // Validar formato de correo electrónico
    var correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!correo.match(correoRegex)) {
        Swal.fire('Error', 'Ingrese una dirección de correo electrónico válida.', 'error');
        return false;
    }

    // Validar que la contrasena tenga al menos 6 caracteres
    if (contrasena.length < 6) {
        Swal.fire('Error', 'La contrasena debe tener al menos 6 caracteres.', 'error');
        return false;
    }

    // Validar que la contrasena coincida con Repetir Contraseña
    if (contrasena !== repetirContrasena) {
        Swal.fire('Error', 'Las contrasenas no coinciden. Por favor, inténtelo de nuevo.', 'error');
        return false;
    }

    // Si todos los datos son válidos, enviar el formulario
    //Swal.fire('Éxito', '¡Usuario registrado con éxito!', 'success');
    registrarUsuarioFirebase(correo, contrasena)

}

// Función para recuperar la contraseña.
function recuperarContrasena() {
    var correo = document.getElementById('correo-recupero').value;

    // Validar que el campo de correo esté lleno
    if (correo === '') {
        Swal.fire('Error', 'Por favor, ingrese su dirección de correo electrónico.', 'error');
        return false;
    }

    // Validar formato de correo electrónico
    var correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!correo.match(correoRegex)) {
        Swal.fire('Error', 'Ingrese una dirección de correo electrónico válida.');
        return false;
    }

    // Aquí puedes agregar el código para enviar una solicitud de recuperación de contraseña al servidor.
    // Puedes usar AJAX o cualquier otra técnica para realizar esta solicitud.

    // Después de enviar la solicitud, puedes mostrar un mensaje de éxito.
    Swal.fire('Éxito', correo + ' Solicitud de recuperación de contraseña enviada con éxito.');
    return true;
}


