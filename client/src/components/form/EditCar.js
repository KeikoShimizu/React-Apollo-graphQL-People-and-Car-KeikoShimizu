import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation  } from 'react-router-dom'
import  { Button, Form, Input, InputNumber }from 'antd'
import { UPDATE_CAR } from '../../queries'
import { useMutation } from '@apollo/client'

const EditCar = (props) => {
  const state = useLocation()
  const { Carid, Year, Model, Make, Price, PersonId } = state
  const styles = getStyles()
  
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  const [id] = useState(state.state.carid)
  const [year, setYear] = useState(state.state.year)
  const [make, setMake] = useState(state.state.make)
  const [model, setModel] = useState(state.state.model)
  const [price, setPrice] = useState(state.state.price)
  const [personId, setPersonId] = useState(state.state.personId)

  const [updateCar] = useMutation(UPDATE_CAR)
  const navigate = useNavigate()
  
  useEffect(() => {
    forceUpdate()
  }, [])

  const onFinish = values => {
    const { year, make, model, price } = values
    console.log(id, values, personId)
    updateCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId
      },
    })
    navigate('/')
    window.location.reload()
  }

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'year':
        setYear(value)
        break
      case 'make':
        setMake(value)
        break
      case 'model':
        setModel(value)
        break
      case 'price':
        setPrice(value)
        break
      default:
        break
    }
  }

  return (
    <div style={styles.container}>
      <h2>Edit Car Info</h2>
      <p>Please input new data</p>
      <Form
        form={form}
        name='update-car-info'
        layout='inline'
        onFinish={onFinish}
        size='large'
        style={styles.form}
        initialValues={{ year: year, make: make, model: model, price: price}}
      >
        <Form.Item  label='Manufuctured Year'
                    name='year'
                    style={styles.input}
                    rules={[{ required: false, message: 'Please input Year of car manufuctired.' }]}
        >
          <InputNumber  placeholder={Year} 
                        min={1000}
                        max={9999} 
                        onChange={e => updateStateVariable('year', e.target.value)}
          />
        </Form.Item>

        <Form.Item  label='Brand Name'
                    name='make'
                    style={styles.input}
                    rules={[{ required: false, message: 'Please input car brand name.' }]}
        >
          <Input  placeholder={Make}
                  onChange={e => updateStateVariable('make', e.target.value)}
          />
        </Form.Item>

        <Form.Item  label='Model'
                    name='model'
                    style={styles.input}
                    rules={[{ required: false, message: 'Please input car model name.' }]}
        >
          <Input  placeholder={Model}
                  onChange={e => updateStateVariable('model', e.target.value)}
          />
        </Form.Item>

        <Form.Item  label='Price'
                    name='price'
                    style={styles.input}
                    rules={[{ required: false, message: 'Please input car price.' }]}
        >
          <InputNumber  placeholder={Price} 
                        prefix='$' 
                        min={0}
                        onChange={e => updateStateVariable('price', e.target.value)}
          />
        </Form.Item>

        <Button type="primary" htmlType='edit car' shape="round" >
          EDIT DATA
        </Button>
      </Form>

      <Button type="default" shape="round" onClick={() => navigate('/')} style={styles.backbtn}>
        Back to Home
      </Button>
    </div>
  )
}
const getStyles = () => ({
  container: {
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10
  },
  form: {
    justifyContent: 'center',
    gap: 40,
    width: '40%',
    display: 'block'
  },
  input: {
    marginBottom: 20,
  },
  backbtn: {
    marginTop: 20,
  }
})
export default EditCar
