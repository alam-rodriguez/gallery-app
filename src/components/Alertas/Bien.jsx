import React, { useEffect, useState } from 'react';

import { AiFillCheckCircle } from 'react-icons/ai';

const Bien = ({text, type,setViewAlert }) => {

    setTimeout(()=>{
        setViewAlert(null)
    }, 5000);
    

  return (
    <div className=' d-flex justify-content-center' >
        <div className={`position-fixed top-0 mt-3 p-3 px-4 d-flex rounded-3 shadow-lg ${ type == 'bien' ? 'bg-primary': null}`}  >
            { type == 'bien' ? 
              <AiFillCheckCircle className='fs-2 text-white' />
            : 
              null
            }
            <p className='ps-4 text-center m-0 fs-5 fw-medium text-white'>{text}</p>
        </div>
    </div>
  )
}

export default Bien;


