# react-modal

React modal components built for [theme-ui](https://github.com/system-ui/theme-ui) with `framer-motion` for animations.

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
import { Modal, ModalTitle, ModalContent, ModalFooter } from '../src'
import { Text, Button } from 'theme-ui'

function MyModal(props) {
  return (
    <Modal {...props}>
      {({ close }) => (
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
            <Button onClick={close}>OK</Button>
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

There is an exported `AnimatedModalStack` built on top of [@mattjennings/react-modal-stack](https://github.com/mattjennings/react-modal-stack). As long as the Modal is a motion component at the root, it will animate them in/out appropriately.

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
    default: {
      backgroundColor: 'background',
      borderRadius: 0,
      boxShadow: `md`,
      display: `flex`,
      flexDirection: `column`,
      maxHeight: `100vh`,
      minHeight: '16rem',
      minWidth: '16rem',
      maxWidth: '64rem',
      position: `absolute`,
      top: [`25%`, `25%`, `10%`],
      zIndex: `modal`,
    },
    defaultFullScreen: {
      backgroundColor: 'background',
      borderRadius: 0,
      display: `flex`,
      flexDirection: `column`,
      height: `fill-available`,
      position: `absolute`,
      top: 0,
      width: `100vw`,
      zIndex: `modal`,
    },
  },
})
```
