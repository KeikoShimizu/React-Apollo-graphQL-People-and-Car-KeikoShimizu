import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import CarCard from '../records/CarCard'

const Detail = (props) => {
  const location = useLocation()
  const { myCars } = location.state
  const { firstName } = location.state
  const { lastName } = location.state

  return (
    <div>
      <h2>{firstName} {lastName}'s CAR DETAIL</h2>
      
      {myCars.map((car) => (
        <CarCard key={car.id} id={car.id} year={car.year} make={car.make} model={car.model} price={car.price}/>
      ))}
      
      <Link to='/'>Back to Main Page</Link>
    </div>
  )
}

export default Detail