import cx from 'classnames'
import _, { isNil } from 'lodash'
import React from 'react'

import { MenuProps } from './Menu.types'
import MenuHeader from '../MenuHeader/MenuHeader'
import MenuMenu from '../MenuMenu/MenuMenu'
import { useKeyOnly, useWidthProp } from '../../lib/classNameBuilders'
import getUnhandledProps from '../../lib/getUnhandledProps'
import getElementType from '../../lib/getElementType'
import { createShorthandFactory } from '../../lib/factories'
import MenuItem, { createMenuItem } from '../MenuItem/MenuItem'

import './Menu.css'
/**
 * A menu displays grouped navigation actions.
 * @see Dropdown
 */
class Menu extends React.Component<MenuProps, any> {
    
    constructor(props: any) {
        super(props)
        this.state = {
            activeIndex: "0"
        }
    }

    static Header = MenuHeader
    static Item = MenuItem
    static Menu = MenuMenu

    /**
     * Safely attempt to set state for props that might be controlled by the user.
     * Second argument is a state object that is always passed to setState.
     * @param {object} state State that corresponds to controlled props.
     * @param {function} [callback] Callback which is called after setState applied.
     */
    trySetState = (state: any, callback?: any) => {
        const newState = Object.keys(state).reduce((acc: any, prop: any) => {
            // ignore props defined by the parent
            if (this.props[prop] !== undefined) return acc

            acc[prop] = state[prop]
            return acc
        }, {})

        if (Object.keys(newState).length > 0) this.setState(newState, callback)
    }

    handleItemOverrides = (predefinedProps: any) => ({
        onClick: (e: any, itemProps: any) => {
            const { index } = itemProps

            this.trySetState({ activeIndex: index })

            _.invoke(predefinedProps, 'onClick', e, itemProps)
            _.invoke(this.props, 'onItemClick', e, itemProps)
        },
    })

    renderItems() {
        const { items } = this.props
        const { activeIndex } = this.state

        return _.map(items, (item, index) =>
            createMenuItem(item, {
                defaultProps: {
                    active: parseInt(activeIndex, 10) === index,
                    index,
                },
                overrideProps: this.handleItemOverrides,
            }),
        )
    }

    render() {
        const {
            borderless,
            children,
            className,
            color,
            compact,
            fluid,
            inverted,
            pagination,
            pointing,
            secondary,
            size,
            stackable,
            text,
            vertical,
            widths,
        } = this.props
        const classes = cx(
            'ui',
            color,
            size,
            useKeyOnly(borderless, 'borderless'),
            useKeyOnly(compact, 'compact'),
            useKeyOnly(fluid, 'fluid'),
            useKeyOnly(inverted, 'inverted'),
            useKeyOnly(pagination, 'pagination'),
            useKeyOnly(pointing, 'pointing'),
            useKeyOnly(secondary, 'secondary'),
            useKeyOnly(stackable, 'stackable'),
            useKeyOnly(text, 'text'),
            useKeyOnly(vertical, 'vertical'),
            useWidthProp(widths, 'item'),
            className,
            'menu',
        )
        const rest = getUnhandledProps(Menu, this.props)
        const ElementType = getElementType(Menu, this.props)

        return (
            <ElementType {...rest} className={classes}>
                {isNil(children) ? this.renderItems() : children}
            </ElementType>
        )
    }
}

export const createMenu = createShorthandFactory(Menu, (items: any) => ({ items }))

export default Menu
