import { BiErrorAlt } from 'react-icons/bi';

const Cargando = ({text, type,setViewAlertError }) => {

    setTimeout(()=>{
      setViewAlertError(null)
    }, 5000);
    
  return (
    <div className=' d-flex justify-content-center' >
        <div className={`position-fixed top-0 mt-3 p-3 px-4 d-flex rounded-3 shadow-lg ${ type == 'error' ? 'bg-danger': null}`}  >
          { type == 'error' ? 
            <BiErrorAlt className='fs-2 text-white' />
          : 
            null
          }
          <p className='ps-4 text-center m-0 fs-5 fw-medium text-white'>{text}</p>
        </div>
    </div>
  )
}

export default Cargando;


