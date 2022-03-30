import styled from 'styled-components'
import Input from '../components/ui/Input'

const LifelinesSection = styled.div`
  h1 {
    color: ${({ theme }) => theme.headerText};
    font-size: 30px;
    font-family: ${({ theme }) => theme.fonts};
    font-weight: 800;
    font-size: 30px;
    line-height: 36px;
    display: flex;
    align-items: center;
    position: relative;
    top: 5%;
    bottom: 80.47%;
  }
  h3 {
    color: ${({ theme }) => theme.text};
    font-family: ${({ theme }) => theme.fonts};
    position: relative;
    top: 27.89%;
    bottom: 69.44%;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
  }
  h4 {
    color: ${({ theme }) => theme.text};
    font-family: ${({ theme }) => theme.fonts};
    position: relative;
    top: 27.89%;
    bottom: 69.44%;
    font-weight: 500;
    font-size: 16px;
    line-height: 19.2px;
  }
  p {
    color: ${({ theme }) => theme.text};
    font-family: ${({ theme }) => theme.fonts};
    position: relative;
    top: 27.89%;
    bottom: 69.44%;
    font-weight: 500;
    font-size: 12px;
    line-height: 14.4px;
  }
`
function Lifelines() {
  return (
    <LifelinesSection>
      <h1>Lifelines</h1>
      <h4>Add a custom lifeline</h4>
      <p>Title</p>
      <Input
        type="text"
        placeholder="Ex: World’s Energy From Renewables"
        font-size="12px"
        line-height="25px"
        width="305px"
        height="31px"
      />
      <p>Statistic</p>
      <Input
        type="text"
        placeholder="Ex: 12.77155930 %"
        font-size="12px"
        line-height="25px"
        width="305px"
        height="31px"
      />
    </LifelinesSection>
  )
}

export default Lifelines