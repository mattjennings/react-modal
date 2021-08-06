import React, { useState } from 'react'
import { Modal, ModalTitle, ModalContent, ModalFooter } from '../src'
import { Text, Button } from 'theme-ui'

export default {
  title: 'Modal',
}

export const Basic = () => {
  const [open, setOpen] = useState(true)
  return (
    <>
      <Button onClick={() => setOpen(true)}>open</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        {({ onClose }) => (
          <>
            <ModalTitle>
              <Text
                sx={{
                  fontSize: 2,
                  fontWeight: 'medium',
                }}
              >
                Welcome!
              </Text>
            </ModalTitle>
            <ModalContent>
              <Text>This is the modal example</Text>
            </ModalContent>
            <ModalFooter>
              <Button variant="pill" onClick={onClose}>
                OK
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </>
  )
}

export const CustomAnimation = () => {
  const [open, setOpen] = useState(true)
  return (
    <>
      <Button onClick={() => setOpen(true)}>open</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        animations={{
          default: {
            enter: {
              y: 0,
              transition: {
                duration: 0.3,
                ease: 'easeInOut',
              },
            },
            exit: {
              y: '-100vh',
              transition: {
                duration: 0.3,
                ease: 'easeInOut',
              },
            },
          },
          fullScreen: {
            enter: {
              opacity: 1,
            },
            exit: {
              opacity: 0,
            },
          },
        }}
      >
        {({ onClose }) => (
          <>
            <ModalTitle>
              <Text
                sx={{
                  fontSize: 2,
                  fontWeight: 'medium',
                }}
              >
                Welcome!
              </Text>
            </ModalTitle>
            <ModalContent>
              <Text>This is the modal example</Text>
            </ModalContent>
            <ModalFooter>
              <Button variant="pill" onClick={onClose}>
                OK
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </>
  )
}

export const Scrolling = () => {
  const [open, setOpen] = useState(true)
  return (
    <>
      <Button onClick={() => setOpen(true)}>open</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        {({ onClose }) => (
          <>
            <ModalTitle>
              <Text
                sx={{
                  fontSize: 2,
                  fontWeight: 'medium',
                }}
              >
                Welcome!
              </Text>
            </ModalTitle>
            <ModalContent>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                tristique eleifend ipsum, ut dapibus turpis congue rhoncus.
                Etiam facilisis vulputate felis eget molestie. Curabitur
                facilisis, sem vel tincidunt volutpat, dui tortor rhoncus sem,
                sit amet suscipit nulla dui ut sem. Nulla facilisi. Duis maximus
                lectus magna, sed fringilla ante ultricies at. Fusce magna nibh,
                tristique a mauris id, ultricies porta massa. Duis vel enim non
                ante hendrerit imperdiet sit amet eget enim. Morbi eu neque in
                diam rhoncus vehicula. Sed varius, diam vitae commodo pharetra,
                ante nibh interdum nibh, ac semper nisl felis facilisis lectus.
                Cras cursus sapien nulla, ut finibus tellus pulvinar vitae.
                Mauris consectetur maximus malesuada. Ut id dui vel ipsum
                placerat consectetur. Curabitur facilisis eros et lorem varius
                commodo. Donec libero tellus, auctor eu porta id, lobortis sit
                amet libero. Nam sit amet feugiat nulla. Integer hendrerit non
                erat viverra laoreet. Cras fermentum odio turpis, a dictum massa
                tincidunt vitae. Sed condimentum lacinia arcu, sed lacinia diam
                tincidunt eu. Fusce mollis facilisis nulla at ullamcorper. Cras
                vel luctus arcu. Nullam eget turpis sit amet purus congue
                facilisis varius nec odio. In suscipit mattis magna, eu
                hendrerit risus. Ut porttitor aliquet leo, ut ornare risus.
                Etiam nec ex faucibus, scelerisque metus nec, elementum enim.
                Cras dictum feugiat enim, sit amet dictum magna interdum eget.
                Nullam egestas consequat ipsum sit amet rhoncus. Aenean urna
                ipsum, lacinia a tristique in, egestas sed lectus. Fusce
                fringilla mattis egestas. Phasellus varius elit at aliquam
                ultrices. Sed augue justo, feugiat vitae urna vel, laoreet
                efficitur ligula. Suspendisse placerat varius facilisis.
                Curabitur cursus sollicitudin malesuada. Nam a blandit est.
                Morbi blandit orci sem. Nulla vitae nulla nisl. Ut placerat in
                justo sit amet semper. Vivamus dui sapien, venenatis id metus
                id, laoreet iaculis ipsum. In hac habitasse platea dictumst.
                Integer rutrum, nibh non finibus fermentum, dolor nisl lobortis
                purus, eu fringilla tellus augue ac nisl. Aliquam pulvinar sem
                eu accumsan maximus. Nulla lobortis facilisis mi, at pretium
                tortor ultrices non. Proin cursus lorem vel ipsum malesuada
                commodo. Proin et finibus nibh. Aenean ligula nulla, egestas nec
                ultrices in, mattis id augue. Mauris a ultrices lorem. Donec et
                sem nulla. Suspendisse neque orci, varius sed lectus eget,
                vulputate dignissim nulla. Donec fringilla erat vitae lorem
                porttitor elementum. Morbi euismod lacus ac lacus accumsan
                rutrum. Nam at consequat purus, ut venenatis nisl. Cras gravida
                id nibh vitae venenatis. Nam ac odio nec dui rhoncus pretium non
                eu lacus.
              </Text>
            </ModalContent>
            <ModalFooter>
              <Button variant="pill" onClick={onClose}>
                OK
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </>
  )
}

export const ESCTurnedOff = () => {
  const [open, setOpen] = useState(true)
  return (
    <>
      <Button onClick={() => setOpen(true)}>open</Button>
      <Modal open={open} allowEscKey={false} onClose={() => setOpen(false)}>
        {({ onClose }) => (
          <>
            <ModalTitle>
              <Text
                sx={{
                  fontSize: 2,
                  fontWeight: 'medium',
                }}
              >
                Welcome!
              </Text>
            </ModalTitle>
            <ModalContent>
              <Text>Try pressing ESC. Modal will ignore.</Text>
            </ModalContent>
            <ModalFooter>
              <Button variant="pill" onClick={onClose}>
                OK
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </>
  )
}
