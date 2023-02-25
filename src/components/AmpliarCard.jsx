import React, { useEffect } from 'react'

const AmpliarCard = ({infoCard}) => {

    // useEffect(() => {
    //   console.log(infoCard)
    // }, [])
    

  return (
    <div className="card mb-3">
    <img src={infoCard.imgRes} className="card-img-top" alt="..." style={{height:'300px'}}/>
    <div className="card-body">
        <h5 className="card-title">{infoCard.title}</h5>
        <p className="card-text">{infoCard.subTitle}</p>
        {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
    </div>
    </div>
  )
}

export default AmpliarCard;
