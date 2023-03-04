import React, { useState } from 'react'
import  { Button } from 'antd'
import Modal from 'react-modal'
import filter from 'lodash.filter'
import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { GET_CARS, REMOVE_CAR } from '../../queries'


const DeleteCarButton = (props) => {
    const id = props.carid
    const year = props.year
    const make = props.make
    const model = props.model
    const price = props.price
    const styles = getStyles()
    
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [removeCar] = useMutation(REMOVE_CAR)
    
    const submitDelete = () => {
            removeCar({
                variables: {
                    id
                },
                update(cache, { data: { removeCar } }) {
                    const { cars } = cache.readQuery({ query: GET_CARS })
                    cache.writeQuery({
                        query: GET_CARS,
                        data: {
                          cars: filter(cars, c => {
                            return c.id !== removeCar.id
                          })
                        }
                    })
                }
            })
            setModalIsOpen(false)
            window.location.reload()
        }
    
  return (
    <div>
        <button  onClick={() => setModalIsOpen(true)}>
            <DeleteOutlined />DELETE
        </button>

        <Modal isOpen={modalIsOpen} ariaHideApp={false} style={styles.container}>
            <div style={styles.container}>
                <h2 style={styles.title}>Are you sure you want to delete?</h2>
                <p>{year} {make} {model} ${price}</p>
                <div style={styles.btns}>
                    <Button type="primary" onClick={submitDelete}>DELETE</Button>
                    <Button type="default" onClick={() => setModalIsOpen(false)}>BACK HOME</Button>
                </div>
            </div>
            
        </Modal>
    </div>
  )
}
const getStyles = () => ({
    container: {
        padding: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    title: {
        margin: 20,
    },
    btns: {
        display: 'flex',
        gap:20
    }
  })
export default DeleteCarButton
