import React, { useState } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

function ModalExampleBasic(props) {
    console.log(props.value);
  const [open, setOpen] = React.useState(false)
  const [triggerTrue,settriggerTrue] =useState(props.value)

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={triggerTrue? setOpen(true):false}
    >
      <Header icon>
        <Icon name='archive' />
        WatchOut
      </Header>
      <Modal.Content>
        <p>
        You have already adopted a Pokemon of this name
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' inverted onClick={() => setOpen(false)}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleBasic