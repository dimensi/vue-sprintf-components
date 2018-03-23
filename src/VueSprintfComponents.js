const ARGUMENTS_REGEXP = /%c/g
const NAMED_REGEXP = /%(\(\w+)\)c/g

export default {
  name: 'VueSprintfComponents',
  functional: true,
  render: (h, { children, props: { text } }) => {
    console.log(text)
    // const splittedText = text.split(/\{0\}/g)
    // return splittedText.map((part, index) => [part, children[index] || ''])
  },
  props: {
    text: {
      type: String,
      required: true,
    },
  },
}
