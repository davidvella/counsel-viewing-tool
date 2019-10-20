import cx from 'classnames'
import _, { isNil } from 'lodash'
import React from 'react'
import { MenuItemProps } from './MenuItem.types'
import { useKeyOnly } from '../../lib/classNameBuilders'
import getElementType from '../../lib/getElementType'
import getUnhandledProps from '../../lib/getUnhandledProps'
import { createShorthandFactory } from '../../lib/factories'


/**
 * A menu can contain an item.
 */
class MenuItem extends React.Component<MenuItemProps, any> {

  handleClick = (e: any) => {
    const { disabled } = this.props

    if (!disabled) _.invoke(this.props, 'onClick', e, this.props)
  }

  render() {
    const {
      active,
      children,
      className,
      color,
      content,
      disabled,
      header,
      icon,
      link,
      name,
      onClick,
      position,
    } = this.props

    const classes = cx(
      color,
      position,
      useKeyOnly(active, 'active'),
      useKeyOnly(disabled, 'disabled'),
      useKeyOnly(icon === true || (icon && !(name || content)), 'icon'),
      useKeyOnly(header, 'header'),
      useKeyOnly(link, 'link'),
      'item',
      className,
    )
    const ElementType = getElementType(MenuItem, this.props, () => {
      if (onClick) return 'a'
    })
    const rest = getUnhandledProps(MenuItem, this.props)

    if (!isNil(children)) {
      return (
        <ElementType {...rest} className={classes} onClick={this.handleClick}>
          {children}
        </ElementType>
      )
    }

    return (
      <ElementType {...rest} className={classes} onClick={this.handleClick}>
        {isNil(content) ? _.startCase(name) : content}
      </ElementType>
    )
  }
}

export const createMenuItem = createShorthandFactory(MenuItem, (val:any) => ({ content: val, name: val }))

export default MenuItem