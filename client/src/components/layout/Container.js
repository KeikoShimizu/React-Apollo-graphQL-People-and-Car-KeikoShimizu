import React from 'react'
import { useQuery } from '@apollo/client'
import Title from './Title'
import AddPerson from '../form/AddPerson'
import AddCar from '../form/AddCar'
import Records from '../records/Records'
import { GET_PEOPLES } from '../../queries'

const getStyles = () => ({
  container: {
    margin: 20
  }
})
const Container = () => {
  const styles = getStyles()
  const {loading, error, data} = useQuery(GET_PEOPLES)

  if (loading) return 'Loading Now. Please Wait :-)'
  if(error) return `Error.${error.message}`

  return (
    <div style={styles.container}>
      <Title/>
      <AddPerson />
      <AddCar peopleList={data}/>
      <Records peopleList={data}/>
    </div>
  )
}

export default Container
