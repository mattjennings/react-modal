import {
  ModalStack,
  ModalStackProps,
  ModalStackValue,
} from '@mattjennings/react-modal-stack'
import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import Backdrop from './Backdrop'

export default function AnimatedModalStack(props: ModalStackProps) {
  return <ModalStack renderModals={AnimatedModals} {...props} />
}

function AnimatedModals({ stack, closeModal }: ModalStackValue) {
  // Lags slightly behind the `stack` so that we can animate the dismissal of modals
  const [displayedStack, setDisplayedStack] = useState(stack)
  const [skipAnimations, setSkipAnimations] = useState(false)
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    // if we're opening the first modal
    if (stack.length === 1 && displayedStack.length === 0) {
      setOpen(true)
      setDisplayedStack(stack)
    } else {
      // else we are adding or dismissing a modal

      // if either the previous or current modal should skip animations
      const skipAnimations =
        stack?.[stack.length - 1]?.props?.skipAnimations ??
        displayedStack?.[displayedStack.length - 1]?.props?.skipAnimations

      if (skipAnimations) {
        setDisplayedStack(stack)
        setOpen(true)
        setSkipAnimations(true)
      } else {
        setSkipAnimations(false)
        setOpen(false)
      }
    }
  }, [stack])

  // after displayedStack has updated, check whether the current modal should skip animations
  // (incase we transitioned from an animated modal to a skipped animation modal)
  useEffect(() => {
    setSkipAnimations(
      displayedStack?.[displayedStack.length - 1]?.props?.skipAnimations
    )
  }, [displayedStack])

  return (
    <>
      <AnimatePresence>{stack.length > 0 && <Backdrop />}</AnimatePresence>
      {displayedStack.map((modal, index) => {
        const open = index === displayedStack.length - 1 && isOpen

        return (
          <modal.component
            key={index}
            open={open}
            Backdrop={null}
            onClose={closeModal}
            onAnimationComplete={() => {
              // set open state for next modal
              if (stack.length > 0) {
                setOpen(true)
              } else {
                setOpen(false)
              }

              // update displayed stack
              // setTimeout is a hack to prevent a warning about updating state
              // in an unmounted component (I can't figure out why it happens, or why this fixes it)
              setTimeout(() => setDisplayedStack(stack))

              modal.props?.onAnimationComplete?.()
            }}
            skipAnimations={skipAnimations}
            {...modal.props}
          />
        )
      })}
    </>
  )
}
