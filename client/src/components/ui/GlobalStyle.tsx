import { createGlobalStyle } from 'styled-components'
import '@fontsource/lato'
/**
 * @constant {number}
 * Max width in pixels for which the mobile layout should be displayed
 */
const MOBILE_MAX_WIDTH = 767

// interface ThemeType {
//   device: {
//     mobile: string
//     desktop: string
//   }
//   fonts: string
//   text: string
//   secondaryText: string
//   tertiaryText: string
//   headerText: string
//   background: string
//   secondaryBackground: string
//   navBackground: string
//   shadow: string
//   orange: string
//   transparentOrange: string
//   transparentBlue: string
//   transparentPink: string
//   blue: string
//   green: string
//   red: string
//   invalid: string
//   tag: {
//     access: string
//     verified: string
//     unverified: string
//   }
// }

const theme = {
  // media queries for mobile and desktop
  device: {
    mobile: `(max-width: ${MOBILE_MAX_WIDTH}px)`,
    desktop: `(min-width: ${MOBILE_MAX_WIDTH + 1}px)`,
  },
  fonts: 'KatwijkMono, sans-serif',
  secondaryFonts: 'Lato',
  // text colors
  text: '#000000',
  secondaryText: '#5a5a5a',
  tertiaryText: '#979797',
  headerText: '#333333',
  navBarText: '#f2f2f2',
  // background
  background: '#ffffff',
  secondaryBackground: '#f1f1f1',
  navBackground: '#f2f2f2',
  shadow: 'rgba(0, 0, 0, 0.12)',
  // palette
  orange: '#ffa41b',
  transparentOrange: '#ffedd1',
  transparentBlue: '#d9e6f3',
  transparentPink: '#fbe2fb',
  blue: '#619fc8',
  black: '#000000',
  green: '#73cd7c',
  red: '#ff3115',
  invalid: '#ff2633',
  // tag colors
  tag: {
    access: '#ffa41b',
    verified: '#4183c4',
    unverified: '#ff61ef',
  },
}

// TODO: try to create more functional theme helpers
// and maybe move all the colors into a colors object, and add a getColor theme helper

const validatedColor =
  (validThemeColor = 'secondaryBackground', invalidThemeColor = 'invalid') =>
  ({ $invalid, theme }) =>
    $invalid ? theme[invalidThemeColor] : theme[validThemeColor]

const prepend =
  (prefix = '', value) =>
  ({ $prepend }) =>
    `${prefix}${$prepend ? '-right' : '-left'}${value && `: ${value};`}`

const zIndex = {
  mobileTablist: 1,
  topBar: 11,
  modal: 30,
}

const GlobalStyle = createGlobalStyle<{ WindowSize: any }>`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  body {
    font-family: ${({ theme }) => theme.fonts};
    font-weight: 100;
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    overflow: hidden;
    @media ${({ theme }) => theme.device.mobile} {
      // Disable overscrolling on iOS
      overflow: hidden;
      position: fixed;
      height: 100%;
      width: 100%;
    }

  }

  #root {
    // We use innerHeight instead of vh here to avoid viewport issues on mobile
    // This gets passed in from App via @reach/window-size
    height: ${({ windowSize }) => windowSize.height}px;
  }
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.headerText};
  }
  h1, h2, h3, h5, h6 {
    font-weight: bold;
  }
  h1 { font-size: 1.625rem; }
  h2 { font-size: 1.375rem; }
  h3 { font-size: 1.125rem; }
  h4 { 
    font-weight: normal;
    font-size: 1.125rem;
  }
  h5 { font-size: 0.875rem; }
  h6 { 
    font-size: 0.625rem;
    text-transform: uppercase;
  }
  p {
    font-size: 1.125rem;
  }
  p.small {
    font-size: 1rem;
  }
  a {
    text-decoration: underline;
    color: ${({ theme }) => theme.blue};
  }
  [data-reach-dialog-overlay] {
    z-index: ${zIndex.modal};
  }
`

export default GlobalStyle
export { MOBILE_MAX_WIDTH, prepend, theme, validatedColor, zIndex }
