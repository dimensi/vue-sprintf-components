import { createLocalVue, mount } from '@vue/test-utils'
import VueSprintfComponents from '../src/VueSprintfComponents'

const localVue = createLocalVue()

const componentFirst = () => ({
  render: h => <h1>Component First</h1>,
})

const componentSecond = () => ({
  render: h => <h2>Component Second</h2>,
})

const testText = 'My testing text with %c and %c'
const testTextWithNamed = 'My testing text with %(first)c and %(second)c'

const createMount = (text, slots) =>
  mount(VueSprintfComponents, {
    propsData: {
      text,
    },
    slots,
    localVue,
  })

describe('VueSprintfComponents', () => {
  test('Is VueInstance', () => {
    const wrapper = createMount(testText, {
      default: [componentFirst(), componentSecond()],
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
