import React, { useState, useMemo } from 'react'
import {
  Modal,
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalProps,
  AnimatedModalStack,
} from '../src'
import { Text, Button } from 'theme-ui'
import { useModals } from '@mattjennings/react-modal-stack'

export default {
  title: 'Stack',
  decorators: [
    Story => (
      <AnimatedModalStack>
        <Story />
      </AnimatedModalStack>
    ),
  ],
}

export const Basic = () => {
  const { openModal } = useModals()

  function MyModal({
    modalNumber = 1,
    ...props
  }: ModalProps & { modalNumber: number }) {
    const { openModal, stack } = useModals()

    return (
      <Modal {...props}>
        <ModalTitle>
          <Text
            sx={{
              fontSize: 2,
              fontWeight: 'medium',
            }}
          >
            Welcome!
          </Text>
        </ModalTitle>
        <ModalContent>
          <Text>This is modal #{modalNumber}</Text>
        </ModalContent>
        <ModalFooter>
          <Button
            variant="pill"
            onClick={() =>
              openModal(MyModal, { modalNumber: stack.length + 1 })
            }
          >
            Open Another
          </Button>
        </ModalFooter>
      </Modal>
    )
  }

  return <Button onClick={() => openModal(MyModal)}>open</Button>
}

export const SkipAnimations = () => {
  const { openModal } = useModals()

  function MyModal({
    message,
    canOpen = true,
    ...props
  }: ModalProps & { message: string; canOpen?: boolean }) {
    const { openModal } = useModals()

    return (
      <Modal {...props} closeOnOutsideClick={false}>
        <ModalTitle>
          <Text
            sx={{
              fontSize: 2,
              fontWeight: 'medium',
            }}
          >
            Welcome!
          </Text>
        </ModalTitle>
        <ModalContent sx={{ width: 300 }}>
          <Text>{message}</Text>
        </ModalContent>
        <ModalFooter>
          {canOpen && (
            <Button
              variant="pill"
              onClick={() =>
                openModal(MyModal, {
                  skipAnimations: true,
                  message: 'This modal will not animate',
                  canOpen: false,
                })
              }
            >
              Open Another
            </Button>
          )}
        </ModalFooter>
      </Modal>
    )
  }
  return (
    <Button
      onClick={() =>
        openModal(MyModal, {
          message:
            'The next modal will not have animations, but this one will still animate when it is closed.',
        })
      }
    >
      open
    </Button>
  )
}
