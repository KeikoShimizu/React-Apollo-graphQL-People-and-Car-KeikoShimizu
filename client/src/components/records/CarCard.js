import React, { useState } from 'react'
import  { Card }from 'antd'
import { useNavigate } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'
import DeleteCarButton from '../button/DeleteCarButton'

const CarCard = (props) => {
    const [carid] = useState(props.id)
    const [year, setYear] = useState(props.year)
    const [make, setMake] = useState(props.make)
    const [model, setModel] = useState(props.model)
    const [price, setPrice] = useState(props.price)
    const [personId, setPersonId] = useState(props.personId)
    const styles = getStyles()
  
    const navigate = useNavigate()
    const carinfo = `${year} ${make} ${model}  $${price}`
  return (
    <div>
        <Card type="inner" title={carinfo} key={carid} >
            <div style={styles.btns}>
                <button onClick={() => navigate('/edit', { state:{carid: carid, year: year, make: make, model: model, price: price, personId: personId}})}
                >
                    <EditOutlined />EDIT
                </button>

                <DeleteCarButton carid={carid} year={year} make={make} model={model} price={price} />
            </div>
        </Card>
    </div>
  )
}
const getStyles = () => ({
    btns: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      gap: 10
    }
  })
export default CarCard
