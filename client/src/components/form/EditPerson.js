import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation  } from 'react-router-dom'
import  { Button, Form, Input }from 'antd'
import { useMutation } from '@apollo/client'
import { UPDATE_PEOPLE } from '../../queries'

const EditPerson = (props) => {
    
    const state = useLocation()
    const { personid, FirstName, LastName } = state
    const styles = getStyles()

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()
    const [id] = useState(state.state.personid)
    const [firstName, setFirstName] = useState(state.state.firstName)
    const [lastName, setLastName] = useState(state.state.lastName)

    const [updatePeople] = useMutation(UPDATE_PEOPLE)
    const navigate = useNavigate()
    
    useEffect(() => {
        forceUpdate()
      }, [])

    const onFinish = values => {
        const { firstName, lastName } = values
        console.log(id, values)
        updatePeople({
          variables: {
            id,
            firstName,
            lastName,
          },
        })
        navigate('/')
        window.location.reload()
      }

      const updateStateVariable = (variable, value) => {
        switch (variable) {
          case 'firstName':
            setFirstName(value)
            break
          case 'lastName':
            setLastName(value)
            break
          default:
            break
        }
      }
    
  return (
    <div style={styles.container}>
        <h2>EDIT PERSON</h2>
        <p>Please edit person name</p>
      <Form
        form={form}
        name='update-person-info'
        layout='inline'
        onFinish={onFinish}
        size='large'
        style={styles.form}
        initialValues={{ firstName: firstName, lastName: lastName}}
      >
        <Form.Item  label='Firstname'
                    name='firstname'
                    style={styles.input}
                    rules={[{ required: false, message: 'Please input firstname.' }]}
        >
          <Input  placeholder={firstName}
                  onChange={e => updateStateVariable('firstName', e.target.value)}
          />
        </Form.Item>

        <Form.Item  label='Lastname'
                    name='lastname'
                    style={styles.input}
                    rules={[{ required: false, message: 'Please input lastname' }]}
        >
          <Input  placeholder={lastName}
                  onChange={e => updateStateVariable('lastName', e.target.value)}
          />
        </Form.Item>

        <Button type="primary" htmlType='edit name' shape="round" >
          EDIT NAME
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
export default EditPerson
