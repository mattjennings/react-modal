import React from 'react'
import { Box, BoxProps } from 'theme-ui'
import { motion, MotionProps } from 'framer-motion'
import { useModal } from './Modal'

const MotionBox = motion.custom(Box)

export default function Backdrop(props: BoxProps & MotionProps) {
  const { skipAnimations, isFullScreen } = useModal()

  if (isFullScreen) {
    return null
  }

  return (
    <MotionBox
      aria-hidden="true"
      variant="modals.backdrop"
      custom={{ skip: skipAnimations }}
      variants={{
        enter: {
          opacity: 1,
          transition: {
            duration: 0.2,
          },
        },
        exit: ({ skip } = {}) => {
          if (skip) {
            return {
              transition: {
                duration: 0.2,
              },
            }
          }
          return {
            opacity: 0,
            transition: {
              duration: 0.2,
            },
          }
        },
      }}
      animate="enter"
      initial={skipAnimations ? false : 'exit'}
      exit="exit"
      {...(props as any)}
    />
  )
}
