import Header from './components/Header';
import SigninForm from './components/SigninForm';
import SignupForm from './components/SignupForm';
import {desloguearUsuario, createUser, iniciarSesion} from './firebase/firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useEffect, useState } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Content from './components/Content';
import ContentDefault from './components/ContentDefault';

// ALERTAS
import Cargando from './components/Alertas/Cargando';
import Error from './components/Alertas/Error';
import Bien from './components/Alertas/Bien'

function App() {

  const [viewAlert, setViewAlert] = useState(0);
  const [viewAlertError, setViewAlertError] = useState(0);

  const [currentUser, setCurrentUser] = useState(false);

  const [signinForm, setSigninForm] = useState(false);
  const [signupForm, setSignupForm] = useState(false);

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=> {
    // setCurrentUser( iniciarSecionAuto() );
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setCurrentUser( user.email )
      } else {
        setViewAlert( 1 );
      }
    });
    
  }, []);

return (
  <div className="App container-fluid p-0">
    <Header setViewAlert={setViewAlert} setSigninForm={setSigninForm} setSignupForm={setSignupForm} desloguearUsuario={desloguearUsuario} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <main className='container'>
        <section>
          { signinForm ?
              <SigninForm setViewAlert={setViewAlert} setViewAlertError={setViewAlertError} mail={mail} setMail={setMail} password={password} setPassword={setPassword} setCurrentUser={setCurrentUser} iniciarSesion={iniciarSesion} setSigninForm={setSigninForm} />
            : null
          }{ 
          signupForm ?
              <SignupForm setViewAlert={setViewAlert} setViewAlertError={setViewAlertError} mail={mail} setMail={setMail} password={password} setPassword={setPassword} createUser={createUser} setCurrentUser={setCurrentUser} setSignupForm={setSignupForm}/>
            : null
          }
        </section>
        <section>
          { currentUser ?
            <Content currentUser={currentUser} setViewAlert={setViewAlert} />
          : 
            <ContentDefault />
          }
        </section>
      </main>


      {viewAlert == 0 ? 
        <Cargando 
          text='CARGANDO...'
          icon='cargando'
          typeStart='cargando' 
        />
      :viewAlert == 2 ?
        <Bien 
          setViewAlert={setViewAlert}
          text='Usuario creado con exito'
          type='bien'
        />
      :viewAlert == 3 ?
        <Bien 
          setViewAlert={setViewAlert}
          text='Has salido de tu sesion'
          type='bien'
        />
      :viewAlert == 4 ?
        <Bien 
          setViewAlert={setViewAlert}
          text='Has creado la publicacion con exito'
          type='bien'
        />
      : null
      }
      { viewAlertError == 'Este usuario no esta Registrado aun.' ? 
        <Error
          setViewAlertError={setViewAlertError}
          text='Este usuario no esta Registrado aun.'
          type='error'
        />
      : viewAlertError == 'El email ingresado no es un email valido' ?
        <Error
          setViewAlertError={setViewAlertError}
          text='El email ingresado no es un email valido.'
          type='error'
        />
      :viewAlertError == 'Este correo ya esta en uso.'?
        <Error 
          setViewAlertError={setViewAlertError}
          text={viewAlertError}
          type='error'
        />
      :viewAlertError == 'Contraseña incorrecta' ? 
        <Error 
          setViewAlertError={setViewAlertError}
          text={viewAlertError}
          type='error'
        />
      :null
      }
    </div>
  );
}

export default App;
