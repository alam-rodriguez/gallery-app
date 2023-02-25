import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { borrarImagen, eliminarDocumento,actualizarDocumento, subirImagen } from '../firebase/firebase';

const EditarCard = ({ setDatos, currentUser, infoCard, setContectView, setViewAlert}) => {

    // const [newInfo, setNewInfo] = useState({});

    const [newTittle, setNewTittle] = useState('');
    const [newSubTittle, setNewSubTittle] = useState('');

    useEffect(()=>{
        setNewTittle(infoCard.title);
        setNewSubTittle(infoCard.subTitle);
    },[])

    const [newImg, setNewImg] = useState(null);

    const handleDeleteClick = async () => {
        setViewAlert(0)
        await borrarImagen(currentUser,infoCard.id);
        await eliminarDocumento(currentUser,infoCard.id);
        setDatos({});
        setContectView(0);
        setViewAlert(1)
    }

    const handleChangeImg = (e) => setNewImg(e.target.files[0]);
    const handleTittleChange = (e) => setNewTittle(e.target.value);
    const handleSubTittleChange = (e) => setNewSubTittle(e.target.value); 

    const handleSubmit = async () => {
        setViewAlert(0);
        console.log('empieza');
        await actualizarDocumento(currentUser,infoCard.id, newTittle, newSubTittle );
        if(newImg != null){
            await borrarImagen(currentUser, infoCard.id);
            await subirImagen(currentUser, infoCard.id, newImg );
        }
        console.log('termina')
        // console.log(newImg+ '-');
        setContectView(0);
        setViewAlert(1);
    }

  return (
    <div className="card mb-3">
    <img src={infoCard.imgRes} className="card-img-top" alt="..." style={{height:'300px'}}/>
    <div className='p-4 pt-2'>
        <label htmlFor="formFileLg" className="form-label">Si quieras cambiar la imagen, solo selecion otro aqui debajo</label>
        <input className="form-control form-control-lg" id="formFileLg" type="file" onChange={handleChangeImg} />
    </div>
    <hr />
    <div className="card-body d-flex justify-content-between row">
        <div className='col-10'>
            <h5 className="card-title m-0">Titulo:</h5>
            <input className='form-control mb-3' type="text" value={newTittle} onChange={handleTittleChange}/>

            <h5 className="card-title m-0">Subtitulo:</h5>
            <input className='form-control' type="text" value={newSubTittle} onChange={handleSubTittleChange} />
        </div>
        <AiFillDelete className='text-danger align-self-center col-2' onClick={handleDeleteClick} style={{fontSize:'100px'}}/>
    </div>
    <button className='btn btn-outline-success mt-4 fs-4' onClick={handleSubmit}>Enviar</button>
    </div>
  )
}

export default EditarCard;
