import React from 'react'
import { Box, BoxProps } from 'theme-ui'

const ModalContent = React.forwardRef<HTMLDivElement, BoxProps>(
  function ModalContent(props, ref) {
    return <Box variant="modals.content" {...props} ref={ref} />
  }
)

export default ModalContent
