import cx from 'classnames'
import React from 'react'
import { MenuMenuProps } from './MenuMenu.types'
import getUnhandledProps from '../../lib/getUnhandledProps'
import getElementType from '../../lib/getElementType'
import { isNil } from '../../lib/childrenUtils'

/**
 * A menu can contain a sub menu.
 */
const MenuMenu: React.FC<MenuMenuProps> = (props) => {
  const { children, className, content, position } = props

  const classes = cx(position, 'menu', className)
  const rest = getUnhandledProps(MenuMenu, props)
  const ElementType = getElementType(MenuMenu, props)

  return (
    <ElementType {...rest} className={classes}>
      {isNil(children) ? content : children}
    </ElementType>
  )
}

export default MenuMenu;
