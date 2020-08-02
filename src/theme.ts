import { Theme } from 'theme-ui'

export const modalTheme = {
  modals: {
    // Modal components
    backdrop: {
      zIndex: `backdrop`,
      position: `absolute`,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `rgba(0,0,0,0.3)`,
    },
    content: {
      px: '1rem',
      flexGrow: 1,
      overflowY: 'scroll',
    },
    footer: {
      minHeight: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      px: '1rem',
    },
    title: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: 16,
      px: '1rem',
    },

    // Modal variants
    default: {
      backgroundColor: 'background',
      borderRadius: 'lg',
      boxShadow: `md`,
      display: `flex`,
      flexDirection: `column`,
      maxHeight: `80vh`,
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
  zIndices: {
    backdrop: 100,
    modal: 110,
  },
}

export function withModalTheme<T extends Theme>(theme: T) {
  return {
    ...theme,
    modals: { ...modalTheme.modals, ...((theme as any)?.modals ?? {}) },
    zIndices: {
      ...modalTheme.zIndices,
      ...(theme?.zIndices ?? []),
    },
  }
}
