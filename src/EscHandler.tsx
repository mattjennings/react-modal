import { useModals } from '@mattjennings/react-modal-stack'
import React, { useEffect } from 'react'

export function EscHandler({ onClose }: { onClose?: () => any }) {
  const { closeModal } = useModals()

  function handleClose() {
    if (onClose) {
      onClose()
    } else if (closeModal) {
      closeModal()
    }
  }

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.code === 'Escape' || event.keyCode === 27) {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  })

  return <></>
}
