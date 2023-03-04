import React, { useState }from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from 'antd'
import { useQuery } from '@apollo/client'

import { GET_CARS } from '../../queries'
import CarCard from './CarCard'
import DeletePersonButton from '../button/DeletePersonButton'

const PeopleCard = (props) => {
    
    const [personid] = useState(props.id)
    const [firstName, setFirstName] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)
    const myCars = []
    const styles = getStyles()
    const navigate = useNavigate()

    //GET CARS
    const {loading, error, data} = useQuery(GET_CARS)

    if (loading) return 'Loading Cars Now. Please Wait :-)'
    if(error) return `Error.${error.message}`

    const fullName = `${firstName} ${lastName}`
  return (
    <div style={styles.container}>
      <Card key={personid} title={fullName} style={styles.font}>
        <div style={styles.namebtns}>
          <p style={styles.edittitle}>Edit Name: </p>
          <button onClick={() => navigate('/editpeople', { state:{personid: personid, firstName: firstName, lastName: lastName}})}>
            EDIT
          </button>
          <DeletePersonButton personid={personid} firstName={firstName} lastName={lastName}/>
        </div>
        {data.cars.map((car) => (
            personid === car.personId ? 
              myCars.push(car) &&
              <CarCard key={car.id} id={car.id} year={car.year} make={car.make} model={car.model} price={car.price} personId={car.personId}/> : null
        ))}
        <Link to='/detail' state={{ myCars: myCars, firstName:firstName, lastName: lastName}}>Learn More</Link>
      </Card>
    </div>
  )
}
const getStyles = () => ({
  container: {
    width: '100%'
  },
  font: {
    textAlign: 'left'
  },
  namebtns: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  edittitle: {
    margin: 0,
  }

})
export default PeopleCard
