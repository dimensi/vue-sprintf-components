export const createNamedRegexp = () => /%\((\w+)\)c/g
export const notEnoghtSlots = () => new Error('Not enought slots for placeholders')
export const createArgsRegexp = () => /%c/g

/**
 * Function create arr for render from text with placeholders and components
 *
 * @param {string} text string with args placeholders `%c`
 * @param {RegExp} regExp - pattern for search placeholders
 * @param {[]Object} placeholders array with components
 * @param {Boolean} silent boolean for disable throw errors
 * @returns {[][]string}
 */
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
/**
 * Function create arr for render from text with placeholders and components
 *
 * @param {string} text string with named placeholders `%(named)c`
 * @param {RegExp} regExp - pattern for search placeholders
 * @param {Object<string, any>} placeholders object with components
 * @param {Boolean} silent boolean for disable throw errors
 * @returns {[][]string}
 */
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
