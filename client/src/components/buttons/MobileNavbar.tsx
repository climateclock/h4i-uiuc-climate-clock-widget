import { Menu } from '@styled-icons/boxicons-regular'
import { useState } from 'react'
import MobileBar from './MobileBar'

function MobileNavbar(props: any) {
  const [navHeight, setNavHeight] = useState('0%')
  const [showMobileNavbar, setMobileNavbar] = useState(false)
  const closeNavbar = () => {
    setNavHeight('0%')
    setMobileNavbar(!showMobileNavbar)
  }
  return (
    <div>
      <Menu
        size="8%"
        onClick={() => {
          setNavHeight('100%')
          setMobileNavbar(!showMobileNavbar)
        }}
      />
      {showMobileNavbar && (
        <MobileBar height={navHeight} closeNav={closeNavbar} />
      )}
    </div>
  )
}

export default MobileNavbar
