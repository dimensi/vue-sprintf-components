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
    if (!text) {
      return ''
    }

    if (!createNamedRegexp().test(text)) {
      return arrSprintf(text, createArgsRegexp(), children, silent)
    }

    return arrSprintfNamed(text, createNamedRegexp(), slots(), silent)
  },
  props: {
    /**
     * String with placeholders %c or %(named)c
     */
    text: {
      type: String,
      required: true,
    },
    /**
     * Boolean for disable errors
     */
    silent: Boolean,
  },
}
