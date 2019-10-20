import _ from 'lodash'
import React from 'react'
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Menu from './Menu';
import sinon from 'sinon';
import '../../lib/testsetup'

describe('Menu', () => {

    const sandbox = sinon.createSandbox()

    afterEach(() => {
        sandbox.restore()
    })

    it('renders a `div` by default', () => {
        shallow(<Menu />).should.have.tagName('div')
    })

    describe('activeIndex', () => {
        const items = [{ key: 'home', name: 'home' }, { key: 'users', name: 'users' }]

        it('is null by default', () => {
            shallow(<Menu items={items} />).should.not.have.descendants('.active')
        })

        it('is set when clicking an item', () => {
            const wrapper = mount(<Menu items={items} />)

            wrapper
                .find('MenuItem')
                .at(1)
                .simulate('click')

            // must re-query for the menu items or we get a cached copy
            wrapper
                .find('MenuItem')
                .at(1)
                .should.have.prop('active', true)
        })

    })
    describe('items', () => {
        const spy = sandbox.spy()
        const items = [
            { key: 'home', name: 'home', onClick: spy, 'data-foo': 'something' },
            { key: 'users', name: 'users', active: true, 'data-foo': 'something' },
        ]
        const children = mount(<Menu items={items} />).find('MenuItem')

        it('renders children', () => {
            children.first().should.have.prop('name', 'home')
            children.last().should.have.prop('name', 'users')
        })

        it('onClick can omitted', () => {
            const click = () => children.last().simulate('click')
            expect(click).to.not.throw()
        })

        it('passes onClick handler', () => {
            const event = { target: null }
            const props = { name: 'home', index: 0 }

            children.first().simulate('click', event)

            spy.should.have.been.calledOnce()
            spy.should.have.been.calledWithMatch(event, props)
        })
    })

    describe('onItemClick', () => {
        it('can be omitted', () => {
            const click = () =>
                mount(<Menu items={[{ key: 'home', name: 'home' }]} />)
                    .find('MenuItem')
                    .first()
                    .simulate('click')

            expect(click).to.not.throw()
        })

        it('is called with (e, { name, index }) when clicked', () => {
            const event = { target: null }
            const itemSpy = sandbox.spy()
            const menuSpy = sandbox.spy()

            const items = [
                { key: 'home', name: 'home' },
                { key: 'users', name: 'users', onClick: itemSpy },
            ]
            const matchProps = { index: 1, name: 'users' }

            mount(<Menu items={items} onItemClick={menuSpy} />)
                .find('MenuItem')
                .last()
                .simulate('click', event)

            itemSpy.should.have.been.calledOnce()
            itemSpy.should.have.been.calledWithMatch(event, matchProps)
            menuSpy.should.have.been.calledOnce()
            menuSpy.should.have.been.calledWithMatch(event, matchProps)
        })
    })
})