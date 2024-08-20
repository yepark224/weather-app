import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, setCity, cityChange}) => {
  return (
    <div className = "buttons">
      <Button className = "btn" variant="outline-warning" onClick={()=>{cityChange("current")}}>Current location</Button>
      {cities.map((item, index)=>(
        <Button 
            className='btn'
            variant="outline-light" 
            key={index}
            onClick={()=>setCity(item)}
        >
            {item}
        </Button>
      ))}

    </div>
  )
}

export default WeatherButton
