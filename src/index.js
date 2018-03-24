import {
  createArgsRegexp,
  createNamedRegexp,
  parseTextOnArray,
  proccessArrayWithPlaceholders,
  mergePlaceholders,
} from './utils'

export default {
  name: 'VueSprintfComponents',
  functional: true,
  render: (h, { children, props: { text, silent, placeholders }, slots }) => {
    if (!text) {
      return ''
    }

    if (!createNamedRegexp().test(text)) {
      const tokens = parseTextOnArray(text, createArgsRegexp())
      const holders = mergePlaceholders(children, placeholders)
      return proccessArrayWithPlaceholders(tokens, holders, silent)
    }

    const tokens = parseTextOnArray(text, createNamedRegexp())
    const holders = mergePlaceholders(slots(), placeholders)
    return proccessArrayWithPlaceholders(tokens, holders, silent)
  },
  props: {
    /**
     * String with placeholders {0} or {named}
     */
    text: {
      type: String,
      required: true,
    },
    /**
     * fallback placeholders
     */
    placeholders: [Array, Object],
    /**
     * Boolean for disable errors
     */
    silent: Boolean,
  },
}
