const iconURL = "https://openweathermap.org/img/wn/"
const Card = ({ city: { name, weather } }) => {
  return (
    <div className="card-container">
      <h1 className="card-title">Weather in</h1>
      <h2 className="card-city">{name}</h2>
      <img src={`${iconURL}${weather[0].icon}@2x.png`} alt="weather-icon" />
      <p className="card-weather">{weather[0].description}</p>
    </div>
  )
}

export default Card
