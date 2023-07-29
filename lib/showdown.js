import showdown from 'showdown'

export default new showdown.Converter({
  emoji: true,
  omitExtraWLInCodeBlocks: true,
  strikethrough: true,
  tables: true,
  underline: true
})
