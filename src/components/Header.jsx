import React from 'react';

const Header = ({setSigninForm, setSignupForm, desloguearUsuario, currentUser, setCurrentUser, setViewAlert}) => {

  const handleClickSignin = () => {
    setSigninForm(true);
    setSignupForm(false);
  }
  const handleClickSignup = () => {
    setSignupForm(true);
    setSigninForm(false);
  }
  const handleClickSignout = () => {
    desloguearUsuario();
    setCurrentUser(false);
    setViewAlert(3);
  }

  return (
    <header className='col-12 p-2 p-sm-4 bg-success'>
      <nav className='d-block d-sm-flex justify-content-between'>
        <h2 className='text-white fs-3 fw-bold text-center m-0 mb-3 mb-sm-0'>Gallery App</h2>
        <div>
          <ul className='list-unstyled d-flex justify-content-around w-100 m-0 me-5'>
            { !currentUser ? 
              <>
                <li className='mx-4 pt-sm-1 text-white fs-4 fw-bold' onClick={handleClickSignin}>Sign in</li>
                <li className='mx-4 pt-sm-1 text-white fs-4 fw-bold' onClick={handleClickSignup}>Sign up</li>
              </>
            :
              <li className='mx-4 mx-sm-1 text-white fs-3 fw-bold' onClick={handleClickSignout}>Sign out</li>
            }
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header;
