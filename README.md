# react-modal

React modal components built for [theme-ui](https://github.com/system-ui/theme-ui) with [framer-motion](https://github.com/framer/motion) for animations.

[Live Demo](https://mattjennings.github.io/react-modal/)

## Install

```
npm install @mattjennings/react-modal
```

## Usage

Update your theme-ui theme to include the modal theme

```jsx
import { tailwind } from '@theme-ui/presets'
import { withModalTheme } from '@mattjennings/react-modal'

export const theme = withModalTheme(tailwind)
```

Create a modal

```jsx
import React from 'react'
import {
  Modal,
  ModalTitle,
  ModalContent,
  ModalFooter,
} from '@mattjennings/react-modal'
import { Text, Button } from 'theme-ui'

function MyModal(props) {
  return (
    <Modal {...props}>
      {({ onClose }) => (
        <>
          <ModalTitle>
            <Text
              sx={{
                fontSize: 2,
                fontWeight: 'medium',
              }}
            >
              Hello!
            </Text>
          </ModalTitle>
          <ModalContent>
            <Text>This is a modal example</Text>
          </ModalContent>
          <ModalFooter>
            <Button onClick={onClose}>OK</Button>
          </ModalFooter>
        </>
      )}
    </Modal>
  )
}

function MyApp() {
  return (
    <div>
      <Modal open={true} />
    </div>
  )
}
```

## AnimatedModalStack

`AnimatedModalStack` built on top of [@mattjennings/react-modal-stack](https://github.com/mattjennings/react-modal-stack). As long as the Modal is a motion component at the root, it will animate them in/out appropriately.

```jsx
import React from 'react'
import { AnimatedModalStack } from '@mattjennings/react-modal'
import App from './App'

React.render(
  <AnimatedModalStack>
    <App />
  </AnimatedModalStack>,
  document.querySelector('#root')
)
```

## Theming

View the [theme file](./src/theme.ts) to see which properties are customizable.

```jsx
import { tailwind } from '@theme-ui/presets'
import { withModalTheme } from '@mattjennings/react-modal'

export const theme = withModalTheme({
  ...tailwind,
  modals: {
    // add a new `outlined` variant that can be used on <Modal />
    outlined: {
      backgroundColor: 'background',
      border: '1px solid',
      borderRadius: '5px',
      borderColor: 'gray',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '100vh',
      minHeight: '16rem',
      minWidth: '16rem',
      maxWidth: '64rem',
      position: 'absolute',
      top: ['25%', '25%', '10%'],
      zIndex: 'modal',
    },

    // will be used for the `outlined` variant when the modal is in full screen
    outlinedFullScreen: {
      backgroundColor: 'background',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      maxHeight: '100vh',
      height: `fill-available`,
      position: 'absolute',
      top: 0,
      width: '100vw',
      zIndex: 'modal',
    },
  },
})
```
