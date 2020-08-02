import React from 'react'
import { addDecorator } from '@storybook/react'
import { ThemeProvider, Box } from 'theme-ui'
import theme from './theme'

addDecorator(storyFn => (
  <ThemeProvider theme={theme}>
    <Box
      sx={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {storyFn()}
    </Box>
  </ThemeProvider>
))
