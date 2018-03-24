export const createNamedRegexp = () => /%\((\w+)\)c/g
export const notEnoghtSlots = () => new Error('Not enought slots for placeholders')
export const createArgsRegexp = () => /%c/g

export const arrSprintf = (text, regExp, placeholders, silent) => {
  const splittedText = text.split(regExp)

  return splittedText.map((part, index) => {
    if (index + 1 === splittedText.length) {
      return [part]
    }

    if (!placeholders[index] && !silent) {
      throw notEnoghtSlots()
    }

    return [part, placeholders[index] || '']
  })
}

export const arrSprintfNamed = (text, regExp, placeholders, silent) => {
  const result = []
  let matches
  let lastIndex = 0
  while ((matches = regExp.exec(text)) !== null) {
    const [, slotKey] = matches
    const { index } = matches
    if (!placeholders[slotKey] && !silent) {
      throw notEnoghtSlots()
    }

    result.push(
      text.slice(lastIndex, index),
      placeholders[slotKey]
    )

    lastIndex = regExp.lastIndex
  }

  return result
}
