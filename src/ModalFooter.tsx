import React from 'react'
import { Box, BoxProps } from 'theme-ui'

const ModalFooter = React.forwardRef<HTMLDivElement, BoxProps>(
  function ModalFooter(props, ref) {
    return <Box variant="modals.footer" {...props} ref={ref} />
  }
)

export default ModalFooter
