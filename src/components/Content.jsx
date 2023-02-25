import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { FaPlusCircle } from "react-icons/fa";
import SubirImg from './SubirImg';

import { obtenerDatos, obtenerImagenes } from '../firebase/firebase';
import Card from './Card';
import AmpliarCard from './AmpliarCard';
import EditarCard from './EditarCard';





const Content = ({currentUser, setViewAlert}) => {

	const id = toast.loading("Cargando");

	const [contectView, setContectView] = useState(0);
	
	// const [subirIMg, setSubirIMg] = useState(false);

	const [datos, setDatos] = useState([]);

	// const [rotate, setRotate] = useState(false);

	// const [ampliar, setAmpliar] = useState(false);
	const [infoCard, setInfoCard] = useState({});


	useEffect(()=>{
		const crearDatos = async () => {
			const resp = await obtenerDatos(currentUser);
			if( resp == '(auth/network-request-failed)'){
				setDatos(null);
			}else {
				setDatos(resp);
			}
			// setDatos( await obtenerDatos(currentUser) );
			// if( datos == '(auth/network-request-failed)')
			// try {
				
			setViewAlert(1)
			// } catch (error) {
			// 	console.log(datos + '-');
			// }





			
			// console.log( await obtenerDatos(currentUser) );
			

			// console.log(await obtenerImagenes(currentUser, 'imagen de suiza') );
		}
		crearDatos();
		// console.log(contectView)
		
	}, [contectView]);
	// console.log(datos);

	// console.log( + '-');

	useEffect(()=>{
		
	},[])

	
	

  return (
    <section className='mt-5'>
			<h1 className='text-center text-success fs-1 fw-bold'>{currentUser}</h1>
			<div className='d-flex justify-content-around flex-wrap'>
				{ (contectView == 0 && datos.length > 0) ?
					datos.map((card, i)=>(
						<Card  contectView={contectView} setContectView={setContectView} setInfoCard={setInfoCard} currentUser={currentUser} obtenerImagenes={obtenerImagenes} key={i} id={card.id} title={card.title} subTitle={card.subtittle} img={card.img}  />
					))
				: contectView == 1 ?
					<SubirImg setContectView={setContectView} currentUser={currentUser} setViewAlert={setViewAlert} />
				: contectView == 2 ?
					<AmpliarCard infoCard={infoCard} setContectView={setContectView}/>
				: contectView == 3 ?
					<EditarCard setDatos={setDatos} currentUser={currentUser} infoCard={infoCard} setContectView={setContectView} setViewAlert={setViewAlert} />
				: null 
				}
			</div>
			{ contectView == 0 ?
				<FaPlusCircle className='position-absolute bottom-0 end-0 m-3 text-success shadow-lg' style={{fontSize:'40px'}} onClick={() => {setContectView(1)}}/>
			: contectView == 1 ?
				<FaPlusCircle className='position-absolute bottom-0 end-0 m-3 text-success shadow-lg' style={{fontSize:'40px', transform:"rotate(45deg)"}} onClick={() => {setContectView(0)}}/>
			: contectView == 2 ?
				<FaPlusCircle className='position-absolute bottom-0 end-0 m-3 text-success shadow-lg' style={{fontSize:'40px', transform:"rotate(45deg)"}} onClick={() => {setContectView(0)}}/>
			: contectView == 3 ?
				<FaPlusCircle className='position-absolute bottom-0 end-0 m-3 text-success shadow-lg' style={{fontSize:'40px', transform:"rotate(45deg)"}} onClick={() => {setContectView(0)}}/>
			: null
			}
		</section>
  )
}

export default Content;