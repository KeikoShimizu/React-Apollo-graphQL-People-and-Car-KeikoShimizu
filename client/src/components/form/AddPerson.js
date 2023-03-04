import React, { useState, useEffect }from 'react'
import { Form, Input, Button,  Divider } from 'antd'
import { useMutation } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import { ADD_PEOPLE, GET_PEOPLES } from '../../queries'

const AddPerson = () => {
  const [form] = Form.useForm()
  const [id] = useState(uuidv4())
  const [addPeople] = useMutation(ADD_PEOPLE)
  const [, forceUpdate] = useState()
  const styles = getStyles()

  useEffect(() => {
    forceUpdate([])
  }, [])

  const onFinish = values => {
    const {firstName, lastName} = values

    addPeople({
      variables: {
        id,
        firstName,
        lastName
      },
      update: (cache, {data: {addPeople}}) => {
        const data = cache.readQuery({query: GET_PEOPLES})
        cache.writeQuery({
          query: GET_PEOPLES,
          data: {
            ...data, 
            peoples: [...data.peoples, addPeople]
          }
        })
      }
    })
  }
  return (
    <div style={styles.container}>
      <Divider plain><h2>Add Person</h2></Divider>
      <Form   name='add-peoson-info'
              form={form}
              layout='inline'
              onFinish={onFinish}
              size='large'
              style={{ marginBottom: '40px'}}
      >
        <Form.Item  label='First Name' 
                    name='firstName'
                    rules={[{ required: true, message: 'Please input your first name' }]}
        >
          <Input placeholder='firstname'/>
        </Form.Item>

        <Form.Item  label='Last Name' 
                    name='lastName'
                    rules={[{ required: true, message: 'Please input your last name' }]}
        >
          <Input placeholder='lastname'/>
        </Form.Item>  

        <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='add people'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >Add Person</Button>
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
    alignItems: 'center',
  }
})

export default AddPerson
