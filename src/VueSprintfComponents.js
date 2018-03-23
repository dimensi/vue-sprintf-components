export default {
  name: 'VueSprintfComponents',
  functional: true,
  render: (h, { children, props: { text } }) => {
    const splittedText = text.split(/\{0\}/g);
    return splittedText.map((part, index) => [part, children[index] || '']);
  },
  props: {
    text: String,
  },
};
