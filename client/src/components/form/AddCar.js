import React, { useState, useEffect }from 'react'
import { Form, Input, Button, Divider, Select, InputNumber } from 'antd'
import { useMutation } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import { ADD_CAR, GET_CARS } from '../../queries'

const AddCar = ({peopleList}) => {

  const list = peopleList.peoples
  const nameList = []
  const [form] = Form.useForm()
  const [id] = useState(uuidv4())
  const [addCar] = useMutation(ADD_CAR)
  const [, forceUpdate] = useState()
  const [personId, setPersonId] = useState()
  const styles = getStyles()

  useEffect(() => {
    forceUpdate([])
  }, [])

  const onFinish = values => {
    const {year, make, model, price } = values
    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId
      },
      update: (cache, {data: {addCar}}) => {
        const data = cache.readQuery({query: GET_CARS})
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data, 
            cars: [...data.cars, addCar]
          }
        })
      }
    })
  }

  //Dropdown List Create
  const List = () => {
    list.map((person) => {
      const names = {value: `${person.id}`, label: `${person.firstName} ${person.lastName}`}
      nameList.push(names)
    })
  }
  List()

  return (
    <div style={styles.container}>
      <Divider plain><h2>Add Car</h2></Divider>
      <Form name='add-car-info'
            form={form}
            size='large'
            layout='inline'
            onFinish={onFinish}
            style={styles.form}
      >
        <Form.Item  label='Year' 
                    name='year'
                    rules={[{ required: true, message: 'Please input year' }]}
        >
          <InputNumber placeholder='Year' max={9999} min={1000}/>
        </Form.Item>

        <Form.Item  label='Make' 
                    name='make'
                    rules={[{ required: true, message: 'Please input car brand name' }]}
        >
          <Input placeholder='Make'/>
        </Form.Item>

        <Form.Item  label='Model' 
                    name='model'
                    rules={[{ required: true, message: 'Please input car model' }]}
        >
          <Input placeholder='Model'/>
        </Form.Item>

        <Form.Item  label='Price' 
                    name='price'
                    rules={[{ required: true, message: 'Please input price' }]}
        >
          <InputNumber prefix='$' min={0}/>
        </Form.Item>

        <Form.Item  label='Person' 
                    name='personId'
                    rules={[{ required: true, message: 'Please select car owner' }]}
        >
          <Select showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={(value) => (setPersonId(value))}
                  options={nameList}   
          />
        </Form.Item>

        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type='primary'
              htmlType='add car'
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >Add Car</Button>
          )}
        </Form.Item>
      </Form>
    </div>
  )
}
const getStyles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    justifyContent: 'center',
    gap: 10,
  }
})
export default AddCar