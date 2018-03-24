import {
  createArgsRegexp,
  createNamedRegexp,
  parseTextOnArray,
  proccessArrayWithPlaceholders,
} from './utils'

export default {
  name: 'VueSprintfComponents',
  functional: true,
  render: (h, { children, props: { text, silent }, slots }) => {
    if (!text) {
      return ''
    }

    if (!createNamedRegexp().test(text)) {
      const tokens = parseTextOnArray(text, createArgsRegexp())
      const result = proccessArrayWithPlaceholders(tokens, children, silent)
      return result
    }

    const tokens = parseTextOnArray(text, createNamedRegexp())
    return proccessArrayWithPlaceholders(tokens, slots(), silent)
  },
  props: {
    /**
     * String with placeholders %c or %(named)c
     */
    text: {
      type: String,
      required: true,
    },

    placeholders: [Array, Object],
    /**
     * Boolean for disable errors
     */
    silent: Boolean,
  },
}
