import '@reach/menu-button/styles.css'

import { Menu, MenuButton, MenuItem, MenuList } from '@reach/menu-button'
import { PencilFill } from '@styled-icons/bootstrap'
import { Show } from '@styled-icons/boxicons-regular/Show'
import { ChevronDown, TrashAlt } from '@styled-icons/boxicons-solid'
import { useState } from 'react'
import styled from 'styled-components'

import DeleteModal from '../modals/DeleteModal'
import EditModal from '../modals/EditModal'

type MenuItemProps = {
  children?: React.ReactNode
  onSelect(): void
  disabled?: boolean
  index?: number
  valueText?: string
  isEnabled?: boolean
}

interface DropdownInterface {
  isDisplayed: boolean
  isCustomizable: boolean | undefined
  onDelete: (index: number) => void
  index: number
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
  height: 33px;

  h4 {
    font-family: ${({ theme }) => theme.secondaryFonts};
    color: ${({ theme }) => theme.secondaryText};
    font-size: 1em;
    margin-right: 5px;
  }
`

export const StyledMenuItem = styled(MenuItem)<MenuItemProps>`
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

export const StyledShow = styled(Show)<{
  disabled?: boolean
  onSelect?: () => void
  isEnabled?: boolean
}>`
  color: ${(props) =>
    props.isEnabled
      ? ({ theme }) => theme.headerText
      : ({ theme }) => theme.secondaryText};
  height: 16px;
  margin-right: 5px;
`

export const StyledPencilFill = styled(PencilFill)<{ isEnabled?: boolean }>`
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

export const MenuText = styled.h3<{ isEnabled?: boolean }>`
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
  isDisplayed,
  isCustomizable,
  onDelete,
  index,
}: DropdownInterface) => {
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)
  return (
    <div>
      <Menu>
        <StyledMenuButton>
          <h4>Actions</h4>
          <StyledChevronDown />
        </StyledMenuButton>
        <StyledMenuList>
          {/* <StyledMenuItem
            onSelect={() => {
              console.log()
            }}
            disabled={!isDisplayed}
          >
            <StyledShow isEnabled={isDisplayed} />
            <MenuText isEnabled={isDisplayed}>Show</MenuText>
          </StyledMenuItem> */}
          <StyledMenuItem
            disabled={!isCustomizable}
            onSelect={() => setShowEditDialog(true)}
          >
            <StyledPencilFill isEnabled={isCustomizable} />
            <MenuText isEnabled={isCustomizable}>Edit</MenuText>
          </StyledMenuItem>
          <StyledMenuItem onSelect={() => setShowDeleteDialog(true)}>
            <StyledTrash />
            <MenuText isEnabled={true}>Delete</MenuText>
          </StyledMenuItem>
        </StyledMenuList>
      </Menu>
      <EditModal
        showDialog={showEditDialog}
        setShowDialog={setShowEditDialog}
        index={index}
      />
      <DeleteModal
        showDialog={showDeleteDialog}
        setShowDialog={setShowDeleteDialog}
        deleteLifeline={() => onDelete(index)}
      />
    </div>
  )
}
