import {
  createArgsRegexp,
  createNamedRegexp,
  arrSprintfNamed,
  arrSprintf,
} from './utils'

export default {
  name: 'VueSprintfComponents',
  functional: true,
  render: (h, { children, props: { text, silent }, slots }) => {
    if (!createNamedRegexp().test(text)) {
      return arrSprintf(text, createArgsRegexp(), children, silent)
    }

    return arrSprintfNamed(text, createNamedRegexp(), slots(), silent)
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    silent: Boolean,
  },
}
