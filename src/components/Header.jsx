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
    <header className='col-12 p-4 bg-success'>
        <nav className='d-flex justify-content-between'>
            <h2 className='text-white fs-3 fw-bold'>Gallery App</h2>
            <div>
              <ul className='list-unstyled d-flex m-0'>
                { !currentUser ? 
                  <>
                    <li className='mx-4 text-white fs-3 fw-bold' onClick={handleClickSignin}>Sign in</li>
                    <li className='mx-4 text-white fs-3 fw-bold' onClick={handleClickSignup}>Sign up</li>
                  </>
                :
                  <li className='mx-4 text-white fs-3 fw-bold' onClick={handleClickSignout}>Sign out</li>
                }
              </ul>
            </div>
        </nav>
    </header>
  )
}

export default Header;
