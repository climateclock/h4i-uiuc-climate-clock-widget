import { useState, useEffect } from 'react'

// const StyledDiv = styled.div`
//   background: ${({ theme }) => theme.background};
//   font-family: ${({ theme }) => theme.fonts};
// `

// Comment describing component
function MouseTrack(): (number | undefined)[] {
  const [x, setX] = useState()
  const [y, setY] = useState()
  useEffect(() => {
    const update = (e) => {
      setX(e.x)
      setY(e.y)
    }
    window.addEventListener('mousemove', update)
    window.addEventListener('touchmove', update)
    return () => {
      window.removeEventListener('mousemove', update)
      window.removeEventListener('touchmove', update)
    }
  }, [setX, setY])
  let values: (number | undefined)[] = [x, y]
  // return x && y ? <h1>{`x: ${x}; y: ${y};`}</h1> : null
  return values
}

export default MouseTrack
