// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL,deleteObject } from "firebase/storage";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5gOjDlYXYxoMhXXHYvKJckOP62LHDz8Q",
  authDomain: "para-practicar-27253.firebaseapp.com",
  projectId: "para-practicar-27253",
  storageBucket: "para-practicar-27253.appspot.com",
  messagingSenderId: "205252703958",
  appId: "1:205252703958:web:e7e9b3e600e0136f353b77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Referencia de Storage
const storage = getStorage();

// inicializacion de base de datos
const db = getFirestore(app);

// Registrar Usario con correo y contraseña  
export const createUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
	// console.log(userCredential.user)
	return userCredential.user.email;
  } catch (error) {
      return(error.message)
  }
}

// Iniciar sesion con correo y contraseña
export const iniciarSesion = async (email, password) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		return userCredential.user.email;
	} catch (error) {
		return(error.message);
	}
}

// Iniciar sesion de manera aotomatica 
// export const iniciarSecionAuto = () => {
// 	onAuthStateChanged(auth, (user) => {
// 		if (user) {
// 			// User is signed in, see docs for a list of available properties
// 			// https://firebase.google.com/docs/reference/js/firebase.User
// 			const uid = user.uid;
// 			// ...
// 			// console.log(user.email)
// 			return user.email;
// 		} else {
// 			// User is signed out
// 			// ...
// 		}
// 	});
// }

// Desloguear usuario 
export const desloguearUsuario = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		console.log(error)
	}
}

// Subir imagen
// export const subirImagen = async (carpeta, nombreImagen, imgFile) => {
// 	const storageRef = ref(storage, `${carpeta}/${nombreImagen}`);
// 	await uploadBytes(storageRef, imgFile);
// }
export const subirImagen = async (carpeta, idImagen, file) => {

	try {
		const storage = getStorage();
		const storageRef = ref(storage, `imagenes-${carpeta}/${idImagen}`);
		const resp = await uploadBytes(storageRef, file);
		return resp;	
	} catch (error) {
		console.log(error)
	}
	// 'file' comes from the Blob or File API

	// await uploadBytes(storageRef, file).then((snapshot) => {
	// console.log('Uploaded a blob or file!');
	// });
}

// Subir info a base de datos
export const agregarCard = async (user, tittle, subTittle,id) => {
	await setDoc(doc(db, `imagenes-${user}`, id), {
		title: tittle,
		subtittle: subTittle,
		img: `imagenes-${user}/${id}`,
		id: id,
	  });
}

// Obtener todoslos  datos de base de dato
export const obtenerDatos = async (collecion) => {
	try {
		const querySnapshot = await getDocs(collection(db, `imagenes-${collecion}`));
		let data = [];
		querySnapshot.forEach((doc) => {
			// data.imgPath = obtenerImagenes(`imagenes-${}/${}`);

			// doc.data() is never undefined for query doc snapshots
			data.push(doc.data());
		});
		return data;
	} catch (error) {
		return error;
	}
}

// Obtener imagenes de Storage
export const obtenerImagenes = async (imagenPath) => {
	// const pathReference = ref(storage, `${carpeta}/${imagen}`);
	try {
		const url = await getDownloadURL(ref(storage, `${imagenPath}`));
		return url;
	} catch (error) {
		console.log(error)
	}
}

// Borrar imagen
export const borrarImagen = async (carpeta, imagenId) => {
	try {
		const desertRef = ref(storage, `imagenes-${carpeta}/${imagenId}`);
		const resp = await deleteObject(desertRef);
		return resp;
	} catch (error) {
		console.log(error);
	}
}

// Eliminar documento, es decir, card
export const eliminarDocumento = async (collecion, documento) => {
	await deleteDoc(doc(db, `imagenes-${collecion}`, documento));
}

// Actualizar Documento, es decir, card
export const actualizarDocumento = async (carpeta, collection, newTittle, newSubtittle) => {
	const reference = doc(db, `imagenes-${carpeta}`, collection);
	await updateDoc(reference, {
		// img: newimg,
		title: newTittle,
		subtittle: newSubtittle,
	})
}