import React from 'react'
import { Box, BoxProps, Close } from 'theme-ui'
import { useModal } from './ModalContext'

export interface ModalTitleProps extends BoxProps {
  CloseButton?: React.ComponentType<{ onClick: () => any }>
}

const ModalTitle = React.forwardRef<HTMLDivElement, ModalTitleProps>(
  function ModalTitle({ children, CloseButton, ...props }, ref) {
    const { allowClose, onClose } = useModal()

    return (
      <Box variant="modals.title" {...props} ref={ref}>
        {children}
        {allowClose &&
          (CloseButton ? (
            <CloseButton onClick={onClose as any} />
          ) : (
            <Close
              sx={{
                height: 6,
                width: 6,
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={onClose}
            />
          ))}
      </Box>
    )
  }
)

export default ModalTitle
