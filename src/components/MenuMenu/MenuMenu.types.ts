import * as React from 'react'

export interface MenuMenuProps extends StrictMenuMenuProps {
  [key: string]: any
}

export interface StrictMenuMenuProps {
  /** An element type to render as (string or function). */
  as?: any

  /** Primary content. */
  children?: React.ReactNode

  /** Additional classes. */
  className?: string

  /** Shorthand for primary content. */
  content?: React.ReactNode

  /** A sub menu can take left or right position. */
  position?: 'left' | 'right'
}

declare const MenuMenu: React.StatelessComponent<MenuMenuProps>

export default MenuMenu
