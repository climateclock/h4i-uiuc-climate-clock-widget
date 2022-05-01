import { useState } from 'react'
import styled from 'styled-components'

const Toggler = styled.div`
  .toggle-button {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 19px;
  }
  .toggle-button input[type='checkbox'] {
    display: none;
  }
  .toggle-button .switch {
    position: absolute;
    cursor: pointer;
    background-color: #ccc;
    border-radius: 15px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: background-color 0.2s ease;
  }
  .toggle-button .switch::before {
    position: absolute;
    content: '';
    left: 2px;
    top: 2px;
    width: 15px;
    height: 15px;
    background-color: #aaa;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }
  .toggle-button input[type='checkbox']:checked + .switch::before {
    transform: translateX(20px);
    background-color: white;
  }
  .toggle-button input[type='checkbox']:checked + .switch {
    background-color: #32cd32;
  }
`

function Toggle() {
  const [isToggled, setIsToggled] = useState(false)
  const onToggle = () => setIsToggled(!isToggled)
  return (
    <Toggler>
      <label className="toggle-button">
        <input type="checkbox" checked={isToggled} onChange={onToggle} />
        <span className="switch" />
      </label>
    </Toggler>
  )
}

export default Toggle
