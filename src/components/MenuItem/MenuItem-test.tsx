import _ from 'lodash'
import React from 'react'
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import MenuItem from './MenuItem';
import sinon from 'sinon';
import '../../lib/testsetup'

describe('MenuItem', () => {
  const sandbox = sinon.createSandbox()

  afterEach(() => {
    sandbox.restore()
  })

  it('renders a `div` by default', () => {
    shallow(<MenuItem />).should.have.tagName('div')
  })

  describe('name', () => {
    it('uses the name prop as Start Cased child text', () => {
      shallow(<MenuItem name='upcomingEvents' />).should.contain.text('Upcoming Events')
    })
  })

  describe('icon', () => {
    it('does not add `icon` className if there is also `name`', () => {
      shallow(<MenuItem icon='user' name='users' />).should.not.have.className('icon')
    })
    it('does not add `icon` className if there is also `content`', () => {
      shallow(<MenuItem icon='user' content='Users' />).should.not.have.className('icon')
    })
    it('adds `icon` className if there is an `icon` without `name` or `content`', () => {
      shallow(<MenuItem icon='user' />).should.have.className('icon')
    })
  })

  describe('onClick', () => {
    it('is called with (e, data) when clicked', () => {
      const onClick = sandbox.spy()
      const event = { target: null }
      const props = { name: 'home', index: 0 }

      shallow(<MenuItem onClick={onClick} {...props} />).simulate('click', event)

      onClick.should.have.been.calledOnce()
      onClick.should.have.been.calledWithMatch(event, props)
    })

    it('is not called when is disabled', () => {
      const onClick = sandbox.spy()

      shallow(<MenuItem disabled onClick={onClick} />).simulate('click')
      onClick.should.have.callCount(0)
    })

    it('renders an `a` tag', () => {
      shallow(<MenuItem onClick={() => null} />).should.have.tagName('a')
    })
  })
})
