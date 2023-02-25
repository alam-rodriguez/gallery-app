import React from 'react';


const SigninForm = ({mail, setMail, password, setPassword, iniciarSesion, setCurrentUser, setSigninForm, setViewAlertError, setViewAlert}) => {

	const handleChangeMail = (e) => setMail(e.target.value);
	const handleChangePassword = (e) => setPassword(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();
    const resp = await iniciarSesion(mail, password);
    console.log( resp + '---')
    if( resp == 'Firebase: Error (auth/user-not-found).'){
      // console.log('Firebase: Error (auth/network-request-failed).')
      setViewAlertError('Este usuario no esta Registrado aun.')
    }else if( resp == 'Firebase: Error (auth/wrong-password).'){
      setViewAlertError('Contraseña incorrecta')
    }else {
      setCurrentUser( await iniciarSesion(mail, password) );
      setSigninForm(false);
      setViewAlert(2)
    }
	}

  return (
    <form className="col-10 m-5 p-4 border mx-auto border-success" onSubmit={handleSubmit}>
			<p className='fs-1 text-center fw-bold'>Logn In</p>
      <input type="email" className='form-control my-2' value={mail} onChange={handleChangeMail} placeholder='Correo...' autoComplete='on' name='email' required/>
      <input type="password" className='form-control my-2' value={password} onChange={handleChangePassword} placeholder='Contraseña...' required minLength={8}/>
			<input type="submit" value='enviar' className='btn btn-success form-control my-2 fs-3'/>
    </form>
  )
}

export default SigninForm;