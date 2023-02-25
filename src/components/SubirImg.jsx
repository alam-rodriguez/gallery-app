import React, { useState } from 'react';
import { subirImagen, agregarCard } from '../firebase/firebase';
import { v4 as uuidv4 } from 'uuid';

const SubirImg = ({setContectView, currentUser, setViewAlert}) => {

	const [img, setImg] = useState(null);
	const [titulo, setTitulo] = useState('');
	const [subTitulo, setSubTitulo] = useState('');

	const handleClickTitulo = (e) => setTitulo(e.target.value);
	const handleClickSubTitulo = (e) => setSubTitulo(e.target.value);

	const ReadImg = (e) => {
		// setImg({filepreview:URL.createObjectURL(e.target.files[0])});
		setImg(e.target.files[0]);
	}


	const handleSubmit = async (e) => {
		e.preventDefault();
		setViewAlert(0)

		const id = uuidv4();
		await subirImagen(currentUser, id, img);
		await agregarCard(currentUser,titulo, subTitulo, id);
		setContectView(0);
		// setViewAlert(1);
		setViewAlert(4);
	}

  return (
    <form className='m-5 p-5 border border-success' onSubmit={handleSubmit}>
      <div className="input-group mb-3">
				<span className="input-group-text" id="inputGroup-sizing-default">Titulo</span>
				<input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" value={titulo} onChange={handleClickTitulo}/>
			</div>
      <div className="input-group mb-3">
				<span className="input-group-text" id="inputGroup-sizing-default">Subtitulo</span>
				<input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" value={subTitulo} onChange={handleClickSubTitulo}/>
			</div>
      <div>
        <label htmlFor="formFileLg" className="form-label">Seleccione una imagen</label>
        <input className="form-control form-control-lg" id="formFileLg" type="file" onChange={ReadImg} />
      </div>
			<input type="submit" value='Enviar' className='btn btn-success form-control mt-3 fs-3'/>
    </form>
  )
}

export default SubirImg;