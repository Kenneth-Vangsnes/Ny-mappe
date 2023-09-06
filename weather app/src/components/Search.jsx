import axios from "axios"
import { API_Key, URL } from "./api"
import { useEffect, useState } from "react"
import Card from "./Card"
const GEOurl = "http://api.openweathermap.org/geo/1.0/direct?"

const Search = () => {
  const [search, setSearch] = useState("")
  const [results, setResults] = useState()
  const [coordinates, setCoordinates] = useState({ lon: 0, lat: 0 })
  const [city, setCity] = useState()

  const getSearchResults = () => {
    //Uses GEO Api to get cities and coordinates

    axios
      .get(`${GEOurl}q=${search}&limit=5&appid=${API_Key}`)
      .then(function (response) {
        setResults(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    axios
      .get(
        `${URL}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_Key}`
      )
      .then(function (response) {
        setCity(response.data)
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [coordinates])

  return (
    <>
      <div className="search-container">
        <input
          placeholder="Search for City"
          value={search}
          onChange={(e) => setSearch(e.target.value)}></input>
        <button onClick={() => getSearchResults()}>Search</button>
        {results === undefined
          ? null
          : results.map((res, index) => {
              return (
                <div
                  key={res.name + index}
                  onClick={() => {
                    setCoordinates({ lon: res.lon, lat: res.lat })
                  }}>
                  <div>name: {res.name}</div>
                  <div>country: {res.country}</div>
                </div>
              )
            })}
      </div>
      {coordinates.lon === 0 ? null : <Card city={city} />}
    </>
  )
}

export default Search
