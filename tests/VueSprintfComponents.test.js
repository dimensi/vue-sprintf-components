import { createLocalVue, mount } from '@vue/test-utils'
import VueSprintfComponents from '../src/index'

const localVue = createLocalVue()

const componentWrap = (component) => ({
  functional: true,
  render (h, { data, children }) {
    return h('div', [
      h(component, data, children),
    ])
  },
})

const componentFirst = () => ({
  render: h => <h1>Component First</h1>,
})

const componentSecond = () => ({
  render: h => <h2>Component Second</h2>,
})

const testText = 'My testing text with %c and %c'
const testTextWithNamed = 'My testing text with %(first)c and %(second)c'
const goodResult = '<div>My testing text with <h1>Component First</h1> and <h2>Component Second</h2></div>'
const resultWithSilent = '<div>My testing text with <h1>Component First</h1> and </div>'

const notEnoughtSlots = 'Not enought slots for placeholders'

const createMount = (text, slots, silent = false) =>
  mount(componentWrap(VueSprintfComponents), {
    context: {
      props: {
        text,
        silent,
      },
    },
    slots,
    localVue,
  })

describe('VueSprintfComponents', () => {
  test('Work with default slots', () => {
    const wrapper = createMount(testText, {
      default: [componentFirst(), componentSecond()],
    })
    expect(wrapper.html()).toBe(goodResult)
  })

  test('Throw error if slots not enogth', () => {
    const createWithError = () => createMount(testText, {
      default: [componentFirst()],
    })
    expect(createWithError).toThrowError(notEnoughtSlots)
  })

  test('Silent mode with slots', () => {
    const wrapper = createMount(testText, {
      default: [componentFirst()],
    }, true)

    expect(wrapper.html()).toBe(resultWithSilent)
  })

  test('Work with named slots', () => {
    const wrapper = createMount(testTextWithNamed, {
      first: componentFirst(),
      second: componentSecond(),
    })

    expect(wrapper.html()).toBe(goodResult)
  })

  test('Throw error if named slots not enogth', () => {
    const createWithError = () => createMount(testTextWithNamed, {
      first: componentFirst(),
    })

    expect(createWithError).toThrowError(notEnoughtSlots)
  })

  test('Silent mode with named slots', () => {
    const wrapper = createMount(testTextWithNamed, {
      first: componentFirst(),
    }, true)

    expect(wrapper.html()).toBe(resultWithSilent)
  })
})
