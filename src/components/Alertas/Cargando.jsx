import React, { useEffect, useState } from 'react'

const Cargando = ({icon,text, typeStart }) => {

    const [typeEnd, setTypeEnd] = useState(null);

    useEffect(() => {
        if(typeStart == 'cargando'){
            setTypeEnd('red')
        }
    }, [])
    

  return (
    <div className=' d-flex justify-content-center' >
        <div className={`position-fixed top-0 mt-3 p-3 px-4 d-flex rounded-3 shadow-lg ${ typeStart == 'cargando' ? 'bg-body-secondary': null}`}  >
            { icon == 'cargando' ? 
              <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
            : 
              null
            }
            <p className='ps-4 text-center m-0 fs-5 fw-medium'>{text}</p>
        </div>
    </div>
  )
}

export default Cargando;


