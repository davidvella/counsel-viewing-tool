import cx from 'classnames';
import React from 'react';
import getUnhandledProps from '../../lib/getUnhandledProps';
import getElementType from '../../lib/getElementType';
import {isNil} from '../../lib/childrenUtils';
import { MenuHeaderProps } from './MenuHeader.types';

/**
 * A menu item may include a header or may itself be a header.
 */
const MenuHeader: React.FC<MenuHeaderProps> = (props) => {
  const { children, className, content } = props
  const classes = cx('header', className)
  const rest = getUnhandledProps(MenuHeader, props)
  const ElementType = getElementType(MenuHeader, props)

  return (
    <ElementType {...rest} className={classes}>
      {isNil(children) ? content : children}
    </ElementType>
  )
}


export default MenuHeader
