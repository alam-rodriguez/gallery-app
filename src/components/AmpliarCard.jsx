const AmpliarCard = ({infoCard}) => {
    
  return (
    <div className="card mb-3">
      <img src={infoCard.imgRes} className="card-img-top" alt="..." style={{height:'400px', width:'300px', objectFit:'cover', objectPosition:'center'}}/>
      <div className="card-body">
        <h5 className="card-title">{infoCard.title}</h5>
        <p className="card-text">{infoCard.subTitle}</p>
      </div>
    </div>
  )
}

export default AmpliarCard;
