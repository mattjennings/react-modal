import { useModals } from '@mattjennings/react-modal-stack'
// @ts-ignore
import { useResponsiveValue } from '@theme-ui/match-media'
import { AnimatePresence, motion, Variant } from 'framer-motion'
import { ModalContextValue, ModalContext } from './ModalContext'
import React, { useEffect, useMemo } from 'react'
// @ts-ignore
import { TouchScrollable } from 'react-scrolllock'
import { Box, BoxProps } from 'theme-ui'
import Backdrop from './Backdrop'

export interface ModalProps extends Omit<BoxProps, 'children'> {
  open?: boolean

  /**
   * Allow user to close modal
   */
  allowClose?: boolean

  /**
   * Closes modal when user presses the escape key
   */
  closeOnEscKey?: boolean

  /**
   * Closes modal when user clicks outside of the modal
   */
  closeOnOutsideClick?: boolean

  onClose?: () => any

  /**
   * Width of the modal when not full screen
   */
  width?: string | number

  /**
   * Max width of the modal when not full screen
   */
  maxWidth?: string | number

  /**
   * At which breakpoint (and below) it should be fullscreen.
   *
   * Alternatively, true for always and false for never
   */
  fullScreen?: boolean | 'xs' | 'sm' | 'md' | 'lg'

  /**
   * Skips the enter and exit animations
   */
  skipAnimations?: boolean

  /**
   * The component to use as the backdrop behind the modals
   */
  Backdrop?: React.ComponentType<any>

  children?: React.ReactNode | ((props: ModalContextValue) => React.ReactNode)

  /**
   * The framer-motion animation variants to use
   */
  animations?: {
    fullScreen?: {
      enter: Variant
      exit: Variant
    }
    default?: {
      enter: Variant
      exit: Variant
    }
  }
}

const MotionBox = motion.custom(Box)

export default function Modal({
  allowClose = true,
  closeOnEscKey = true,
  closeOnOutsideClick = true,
  Backdrop: BackdropComponent = Backdrop,
  children,
  fullScreen = `xs`,
  maxWidth,
  onClose,
  open,
  skipAnimations = false,
  sx,
  variant = 'default',
  width = `auto`,
  animations,
  ...props
}: ModalProps) {
  const { closeModal } = useModals()

  const modalAnimations = useMemo(() => enhanceAnimations(animations), [
    animations,
  ])
  const isFullScreen = useResponsiveValue(getBreakpoints(fullScreen))
  const animation = useResponsiveValue([
    isFullScreen ? modalAnimations.fullScreen : modalAnimations.default,
    isFullScreen ? modalAnimations.fullScreen : modalAnimations.default,
    modalAnimations.default,
  ])

  function handleClose() {
    if (onClose) {
      onClose()
    } else if (closeModal) {
      closeModal()
    }
  }

  useEffect(() => {
    if (closeOnEscKey) {
      const handleEsc = (event: KeyboardEvent) => {
        if (event.code === 'Escape' || event.keyCode === 27) {
          handleClose()
        }
      }
      window.addEventListener('keydown', handleEsc)

      return () => {
        window.removeEventListener('keydown', handleEsc)
      }
    }
  }, [closeOnEscKey])

  const contextValue = useMemo<ModalContextValue>(
    () => ({
      allowClose,
      onClose,
      skipAnimations,
      isFullScreen,
    }),
    [allowClose, onClose, skipAnimations, isFullScreen]
  )

  return (
    <ModalContext.Provider value={contextValue}>
      <AnimatePresence custom={{ skip: skipAnimations }}>
        {open && (
          <TouchScrollable>
            <Box
              sx={{
                zIndex: `modal`,
                position: `fixed`,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: `flex`,
                justifyContent: `center`,
              }}
              onClick={closeOnOutsideClick ? handleClose : undefined}
            >
              {BackdropComponent && <BackdropComponent />}
              <MotionBox
                aria-modal="true"
                variants={animation}
                animate="enter"
                exit="exit"
                initial={skipAnimations ? false : 'exit'}
                variant={
                  isFullScreen
                    ? `modals.${variant}FullScreen`
                    : `modals.${variant}`
                }
                sx={{
                  width: isFullScreen ? null : width,
                  maxWidth: isFullScreen ? null : maxWidth,
                  ...(sx ?? {}),
                }}
                onClick={ev => ev.stopPropagation()}
                {...(props as any)}
              >
                {typeof children === `function`
                  ? children(contextValue)
                  : children}
              </MotionBox>
            </Box>
          </TouchScrollable>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  )
}

function enhanceAnimations(animations: ModalProps['animations']) {
  const defaultAnimations: Record<string, Record<string, Variant>> = {
    default: {
      enter: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.2,
          ease: `easeInOut`,
        },
      },
      exit: {
        opacity: 0,
        scale: 0.75,
        transition: {
          duration: 0.2,
          ease: `easeInOut`,
        },
      },
    },
    fullScreen: {
      enter: {
        opacity: 1,
        y: 0,
        transition: {
          ease: `easeInOut`,
        },
      },
      exit: {
        opacity: 0,
        y: `100vh`,
        transition: {
          ease: `easeInOut`,
        },
      },
    },
  }

  return {
    fullScreen: animations?.fullScreen
      ? {
          enter: animations.fullScreen.enter,
          exit: (custom: { skip?: boolean } = {}) => {
            if (custom.skip) {
              return {
                transition: {
                  duration: 0,
                },
              }
            }

            return typeof animations?.fullScreen?.exit === 'function'
              ? //@ts-ignore
                animations.fullScreen?.exit(custom)
              : animations.fullScreen?.exit
          },
        }
      : defaultAnimations.fullScreen,
    default: animations?.default
      ? {
          enter: animations.default.enter,
          exit: (custom: { skip?: boolean } = {}) => {
            if (custom.skip) {
              return {
                transition: {
                  duration: 0,
                },
              }
            }

            return typeof animations?.default?.exit === 'function'
              ? //@ts-ignore
                animations.default?.exit(custom)
              : animations.default?.exit
          },
        }
      : defaultAnimations.default,
  }
}

function getBreakpoints(value: boolean | 'xs' | 'sm' | 'md' | 'lg') {
  switch (value) {
    case true:
      return [true, true, true, true, true, true]
    case false:
      return [false, false, false, false, false]
    case `xs`:
      return [true, false, false, false, false]
    case `sm`:
      return [true, true, false, false, false]
    case `md`:
      return [true, true, true, false, false]
    case `lg`:
      return [true, true, true, true, false]
  }
}
