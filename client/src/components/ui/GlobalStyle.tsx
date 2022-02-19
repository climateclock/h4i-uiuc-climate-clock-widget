import '@fontsource/oxygen-mono/400.css'

import { createGlobalStyle } from 'styled-components'

/**
 * @constant {number}
 * Max width in pixels for which the mobile layout should be displayed
 */
const MOBILE_MAX_WIDTH = 767

const theme = {
  // media queries for mobile and desktop
  device: {
    mobile: `(max-width: ${MOBILE_MAX_WIDTH}px)`,
    desktop: `(min-width: ${MOBILE_MAX_WIDTH + 1}px)`,
  },
  fonts: '"Oxygen Mono", sans-serif',
  // text colors
  text: '#9b9b9b',
  secondaryText: '#5a5a5a',
  tertiaryText: '#979797',
  headerText: '#333333',
  // background
  background: '#ffffff',
  secondaryBackground: '#e0e1e2',
  navBackground: '#f2f2f2',
  shadow: 'rgba(0, 0, 0, 0.12)',
  // palette
  orange: '#ffa41b',
  transparentOrange: '#ffedd1',
  transparentBlue: '#d9e6f3',
  transparentPink: '#fbe2fb',
  blue: '#4183c4',
  green: '#73cd7c',
  red: '#ff8188',
  invalid: '#ff2633',
  // tag colors
  tag: {
    access: '#ffa41b',
    verified: '#4183c4',
    unverified: '#ff61ef',
  },
}

export { MOBILE_MAX_WIDTH, theme }
