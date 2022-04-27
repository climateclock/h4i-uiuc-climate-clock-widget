import { Menu } from '@styled-icons/boxicons-regular'
import { useState } from 'react'
import MobileBar from './MobileBar'

function MobileNavbar(props: any) {
  const [showMobileNavbar, setMobileNavbar] = useState(false)
  const closeNavbar = () => {
    setMobileNavbar(!showMobileNavbar)
  }
  return (
    <div>
      <Menu
        size="8%"
        onClick={() => {
          setMobileNavbar(!showMobileNavbar)
        }}
      />
      <MobileBar showMobileNavbar={showMobileNavbar} closeNav={closeNavbar} />
    </div>
  )
}

export default MobileNavbar
