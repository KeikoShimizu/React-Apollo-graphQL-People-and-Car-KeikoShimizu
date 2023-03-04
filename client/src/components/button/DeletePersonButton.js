import React, { useState } from 'react'
import  { Button }from 'antd'
import Modal from 'react-modal'
import filter from 'lodash.filter'
import { useMutation } from '@apollo/client'
import { GET_PEOPLES, REMOVE_PEOPLE } from '../../queries'

const DeletePersonButton = (props) => {
    const id = props.personid
    const firstName = props.firstName
    const lastName = props.lastName
    const styles = getStyles()
    console.log(id, firstName, lastName)

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [removePeople] = useMutation(REMOVE_PEOPLE)

    const submitDelete = () => {
        removePeople({
            variables: {
                id
            },
            update(cache, { data: { removeCar } }) {
                const { peoples } = cache.readQuery({ query: GET_PEOPLES })
                cache.writeQuery({
                    query: GET_PEOPLES,
                    data: {
                      peoples: filter(peoples, c => {
                        return c.id !== removePeople.id
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
        <button onClick={() => setModalIsOpen(true)}>
            DELETE
        </button>

        <Modal isOpen={modalIsOpen} ariaHideApp={false} style={styles.container}>
            <div style={styles.container}>
                <h2 style={styles.title}>Are you sure you want to delete this person ?</h2>
                <p>{firstName} {lastName}</p>
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
export default DeletePersonButton
