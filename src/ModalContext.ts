import React, { useContext } from 'react'

export interface ModalContextValue {
  allowClose: boolean
  skipAnimations?: boolean
  isFullScreen?: boolean
  onClose?: () => any
}

export const ModalContext = React.createContext<ModalContextValue>({} as any)

export function useModal() {
  return useContext(ModalContext)
}
