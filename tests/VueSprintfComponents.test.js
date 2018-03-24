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

const testText = 'My testing text with {0} and {1}'
const testTextWithNamed = 'My testing text with {first} and {second}'
const goodResult = '<div>My testing text with <h1>Component First</h1> and <h2>Component Second</h2></div>'
const resultWithSilent = '<div>My testing text with <h1>Component First</h1> and </div>'

const notEnoughtSlots = 'Not enought placeholders'

const createMount = (text, slots, silent = false, otherprops = {}) =>
  mount(componentWrap(VueSprintfComponents), {
    context: {
      props: {
        text,
        silent,
        ...otherprops,
      },
    },
    slots,
    localVue,
  })

describe('VueSprintfComponents', () => {
  test('Do nothing on empty string', () => {
    const wrapper = createMount()
    const sprintfComp = wrapper.find(VueSprintfComponents)
    expect(sprintfComp.exists()).toBe(false)
  })

  test('Work with default slots', () => {
    const wrapper = createMount(testText, {
      default: [componentFirst(), componentSecond()],
    }, true)
    expect(wrapper.html()).toBe(goodResult)
    const sprintfComp = wrapper.find(VueSprintfComponents)
    expect(sprintfComp.exists()).toBe(true)
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

    const sprintfComp = wrapper.find(VueSprintfComponents)
    expect(sprintfComp.exists()).toBe(true)
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

  test('Create tons components', () => {
    for (let x = 0; x < 10; x++) {
      const wrapper = createMount(testText, {
        default: [componentFirst(), componentSecond()],
      })
      expect(wrapper.html()).toBe(goodResult)
    }

    for (let x = 0; x < 10; x++) {
      const wrapper = createMount(testTextWithNamed, {
        first: componentFirst(),
        second: componentSecond(),
      })

      expect(wrapper.html()).toBe(goodResult)
    }
  })

  test('testing fallback placeholders', () => {
    const namedWrapper = () => createMount(testTextWithNamed, {
      first: componentFirst(),
    }, false, {
      placeholders: {
        second: 'Second placeholder',
      },
    })

    const argsWrapper = () => createMount(testText, {
      default: [componentFirst()],
    }, false, {
      placeholders: ['Second placeholder'],
    })

    const bestResult = '<div>My testing text with <h1>Component First</h1> and Second placeholder</div>'

    expect(namedWrapper().html()).toBe(bestResult)
    expect(argsWrapper().html()).toBe(bestResult)
  })
})
