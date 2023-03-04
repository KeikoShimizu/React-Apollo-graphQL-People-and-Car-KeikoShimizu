import React from 'react'
import { List, Divider } from 'antd'
import PeopleCard from './PeopleCard'

const Records = ({peopleList}) => { 
  const styles = getStyles()
  return (
    <div style={styles.container}>
      <Divider plain><h2>Records</h2></Divider>
      <List style={styles.card}>
        {peopleList.peoples.map(({id, firstName, lastName}) => (
          <List.Item key={id}>
            <PeopleCard key={id} id={id} firstName={firstName} lastName={lastName} />
          </List.Item>
        ))}
      </List>
    </div>
  )
}
const getStyles = () => ({
  container: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10
  },
  card: {
    width: '100%',
  }
})
export default Records
