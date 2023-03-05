import React, { useEffect, useState } from 'react'
import { obtenerImagenes } from '../firebase/firebase';

const Card = ({ currentUser,id, title, subTitle, img, contectView, setContectView, setInfoCard}) => {

  const [imgRes, setImgRes] = useState('');

  useEffect(()=>{
    const obtenerImagenCard = async () => {
      setImgRes( await obtenerImagenes(img) );
    }
    obtenerImagenCard();
    console.log(imgRes);
    // console.log(img);
  }, [contectView]);

  const handleClickAmpliar = () => {
    setContectView(2);
    setInfoCard({title, subTitle, imgRes,id});
  }
  const handleClickEditar = () => {
    setContectView(3);
    setInfoCard({title, subTitle, imgRes,id});
  }

  return (
    <div className="card m-2" style={{width: '18rem'}}>
        <img src={imgRes} className="card-img-top img-fluid" style={{height:'200px', objectFit:'cover',objectPosition:'center'}} alt={'./'+subTitle} />
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{subTitle}</p>
            <div className='d-flex justify-content-around'>
              <button className='btn btn-primary' onClick={handleClickAmpliar}>Ampliar</button>
              <button className='btn btn-danger' onClick={handleClickEditar}>Editar</button>
            </div>
        </div>
    </div>
  )
}

export default Card;
