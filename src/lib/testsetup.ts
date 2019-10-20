/**
 * Setup
 * This is the bootstrap code that is run before any tests, utils, mocks.
 */
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import dirtyChai from 'dirty-chai'
import sinonChai from 'sinon-chai'

enzyme.configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true,
})

// ----------------------------------------
// Chai
// ----------------------------------------
chai.should()
chai.use(chaiEnzyme())
chai.use(dirtyChai)
chai.use(sinonChai)


