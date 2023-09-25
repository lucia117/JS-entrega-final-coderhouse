
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBC2jI2iB9qveyKrsP-bjlQsn0qTDnu2ng",
    authDomain: "proyecto-coderhouse-js.firebaseapp.com",
    projectId: "proyecto-coderhouse-js",
    storageBucket: "proyecto-coderhouse-js.appspot.com",
    messagingSenderId: "848449723155",
    appId: "1:848449723155:web:389eea9e45481a081358e6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const registrarUsuarioFirebase = async (email, password) => {
    console.log("comienzo a guardar", firebase)
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            localStorage.setItem("userCredential", JSON.stringify(userCredential))
            localStorage.setItem("email", email)
            guardarInformacionDbUsuario(email).then(
                Swal.fire('Éxito', '¡Usuario registrado con éxito!', 'success').then(result => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                })
            )
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            Swal.fire('Error', errorMessage, 'error');

            // ..
        });
}

const iniciarSesionFirebase = async (email, password) => {
    console.log("comienzo", email, password);
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("user", user);
            window.location = "../../index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("bad", errorCode, errorMessage);
            Swal.fire('Error', 'Credenciales incorrectas. Por favor, inténtalo de nuevo.', 'error');
        });
}


const guardarInformacionDbUsuario = async (email) => {
    console.log("creando coleccion")
    await db.collection(email).add({
        email,
    });
}

const guardarInformacionUsuario = async (email, persona, modal
) => {
    db.collection(email).get().then(resultId => {
        const id = resultId.docs[0].id;
        const doc = db.collection(email).doc(id);
        const updates = { ...persona }
        doc.update(updates).then(
            Swal.fire('Éxito', '¡Datos registrados!', 'success').then(result => {
                if (result.isConfirmed) {
                    modal.hide()
                }
            })
        )
    })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("bad", errorCode, errorMessage);
            Swal.fire('Error', 'Credenciales incorrectas. Por favor, inténtalo de nuevo.', 'error');
        });
}

const guardarNuevoPeso = async (email, peso, modal
) => {
    db.collection(email).get().then(resultId => {
        const id = resultId.docs[0].id;
        const doc = db.collection(email).doc(id);
        const updates = { historialPeso }
        doc.update(updates).then(
            Swal.fire('Éxito', '¡Datos registrados!', 'success').then(result => {
                if (result.isConfirmed) {
                    modal.hide()
                }
            })
        )
    })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("bad", errorCode, errorMessage);
            Swal.fire('Error', 'Credenciales incorrectas. Por favor, inténtalo de nuevo.', 'error');
        });
}



const obtenerInformacionUsuario = async (email) => {

    return db.collection(email).get().then((querySnapshot) => {
        let data;
        querySnapshot.forEach((doc) => {
            data = doc.data();
        });
        return data
    });
}



const leer = async (email = "mail@mail.com") => {
    db.collection(email).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });
    });
}
/*
Agregar

db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
})
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    }); 
    
Leer    
    db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});


autenticacion  - crear usuario contraseña
firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
    
    */