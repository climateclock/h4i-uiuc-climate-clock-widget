import '@reach/menu-button/styles.css'

import { Menu, MenuButton, MenuItem, MenuList } from '@reach/menu-button'
import { PencilFill } from '@styled-icons/bootstrap'
import { Show } from '@styled-icons/boxicons-regular/Show'
import { ChevronDown, Hide,TrashAlt } from '@styled-icons/boxicons-solid'
import styled from 'styled-components'

import { ModuleResInterface } from '../../interfaces'

interface DropdownInterface {
  lifelineData: ModuleResInterface[]
  isDisplayed: boolean
  isCustomizable: boolean | undefined
  onDelete: (index: number) => void
  index: number
  lifelineCount: number
  numLifelines: number
}

export const StyledMenuList = styled(MenuList)`
  border-radius: 5.25px;
  padding: 0px;
  border: white;
  box-shadow: 0px 3px 6px ${({ theme }) => theme.shadow};

  [data-reach-menu-item][data-selected] {
    background: ${({ theme }) => theme.select};
  }
`

export const StyledMenuButton = styled(MenuButton)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1.1px solid;
  border-color: ${({ theme }) => theme.secondaryBackground};
  background-color: ${({ theme }) => theme.background};
  border-radius: 5.25px;
  padding: 15px 10px 15px 10px;
  margin-right: 3px;
  margin-left: 3px;
  height: 33px;

  h4 {
    font-family: ${({ theme }) => theme.secondaryFonts};
    color: ${({ theme }) => theme.secondaryText};
    font-size: 1em;
    margin-right: 5px;
  }
`

export const StyledMenuItem = styled(MenuItem)`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 5.25px;
  padding-top: 0px;
  padding-bottom: 0px;
`

export const StyledTrash = styled(TrashAlt)`
  color: ${({ theme }) => theme.headerText};
  height: 16px;
  margin-right: 5px;
`

export const StyledShow = styled(Show)`
  color: ${({ theme }) => theme.headerText};
  height: 16px;
  margin-right: 5px;
`

export const StyledHide = styled(Hide)`
  color: ${({ theme }) => theme.headerText};
  height: 16px;
  margin-right: 5px;
`

export const StyledPencilFill = styled(PencilFill)`
  color: ${(props) =>
    props.isEnabled
      ? ({ theme }) => theme.headerText
      : ({ theme }) => theme.secondaryText};
  height: 16px;
  margin-right: 5px;
`

export const StyledChevronDown = styled(ChevronDown)`
  color: ${({ theme }) => theme.secondaryText};
  height: 22px;
  margin-right: 5px;
`

export const MenuText = styled.h3`
  color: ${(props) =>
    props.isEnabled
      ? ({ theme }) => theme.headerText
      : ({ theme }) => theme.secondaryText};
  font-size: 1em;
  font-family: ${({ theme }) => theme.secondaryFonts};
  font-weight: lighter;
  margin-left: 5px;
`

export const StyledMenu = styled(Menu)`
  color: theme.secondaryBackground;
`

export const LifelineDropdown = ({
  lifelineData,
  isDisplayed,
  isCustomizable,
  onDelete,
  index,
  lifelineCount,
  numLifelines
}: DropdownInterface) => {

  function isShowEnabled() {
    if (lifelineCount < 3) {
      return true;
    }

    return false;
  }

  function onShowOrHide(isShow : boolean) {
    const numLifelinesChange = isShow ? 1 : -1;

    console.log("old: ", index, " new: ", numLifelines - 1);
    console.log("numLifelines: ", numLifelines);

    lifelineData.splice(numLifelines - 1, 0, lifelineData.splice(index, 1)[0])

    console.log("index: ", index)

    numLifelines += numLifelinesChange;
  }

  return (
    <div>
      <Menu>
        <StyledMenuButton>
          <h4>Actions</h4>
          <StyledChevronDown />
        </StyledMenuButton>
        <StyledMenuList>
          {!isDisplayed ?
          <StyledMenuItem disabled={!isShowEnabled} onClick={() => onShowOrHide(true)}>
            <StyledShow isEnabled={isShowEnabled} />
            <MenuText isEnabled={isShowEnabled}>Show</MenuText>
          </StyledMenuItem>
          :
          <StyledMenuItem onClick={() => onShowOrHide(false)}>
            <StyledHide isEnabled={true} />
            <MenuText isEnabled={true}>Hide</MenuText>
          </StyledMenuItem>
          }
          <StyledMenuItem disabled={!isCustomizable} onSelect={() => console.log(isCustomizable)}>
            <StyledPencilFill
              isEnabled={isCustomizable}
            />
            <MenuText isEnabled={isCustomizable}>Edit</MenuText>
          </StyledMenuItem>
          <StyledMenuItem onSelect={() => onDelete(index)}>
            <StyledTrash />
            <MenuText isEnabled={true}>Delete</MenuText>
          </StyledMenuItem>
        </StyledMenuList>
      </Menu>
    </div>
  )
}
