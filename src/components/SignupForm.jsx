import React from 'react'

const SignupForm = ({mail, setMail, password, setPassword, createUser, setCurrentUser, setSignupForm, setViewAlertError, setViewAlert}) => {

  const handleChangeMail = (e) => setMail(e.target.value);
	const handleChangePassword = (e) => setPassword(e.target.value);

	const handleSubmit = async (e) => {
    // console.log(mail, password)
		e.preventDefault();
    const resp = await createUser(mail, password);
    if(resp == 'Firebase: Error (auth/invalid-email).'){
      setViewAlertError('El email ingresado no es un email valido');
    }else if(resp == 'Firebase: Error (auth/email-already-in-use).'){
      setViewAlertError('Este correo ya esta en uso.');
    }else {
      setCurrentUser( resp );
      setViewAlert( 2 );
      setSignupForm(false);
    }

    // try {
    //   console.log('enviado');
    //   setCurrentUser( await createUser(mail, password) );
    //   setSignupForm(false)
    // } catch (error) {
    //   alert(error)
    // }
	}

  return (
    <form className="col-10 m-5 p-4 border mx-auto border-success"  onSubmit={handleSubmit}>
	    <p className='fs-1 text-center fw-bold'>Logn Up</p>
      <input type="email" className='form-control my-2' value={mail} onChange={handleChangeMail} placeholder='Correo...' autoComplete='on' name='email'/>
      <input type="password" className='form-control my-2' value={password} onChange={handleChangePassword} placeholder='Contraseña...'/>
			<input type="submit" value='enviar' className='btn btn-success form-control my-2 fs-3'/>
    </form>
  )
}

export default SignupForm;
