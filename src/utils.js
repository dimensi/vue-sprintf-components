export const createNamedRegexp = () => /\{([a-zA-Z]+)\}/g
export const notEnoghtPlaceholders = () => new Error('Not enought placeholders')
export const notSuitablePlaceholders = () => new Error('Not suitable placeholders')
export const createArgsRegexp = () => /\{(\d)\}/g

/**
 * Parse text with placeholders on array
 *
 * @param {string} text
 * @param {RegExp} regExp
 */
export const parseTextOnArray = (text, regExp) => {
  if (!regExp.test(text)) {
    return [text]
  }

  const result = []
  let matches
  regExp.lastIndex = 0
  let lastIndex = regExp.lastIndex
  let indexKey = 0

  while ((matches = regExp.exec(text)) !== null) {
    let [, key] = matches
    const { index } = matches
    if (!key) {
      key = String(indexKey)
      indexKey++
    }

    result.push(
      text.slice(lastIndex, index),
      { key }
    )

    lastIndex = regExp.lastIndex
  }
  const tailText = text.slice(lastIndex, text.length)
  if (tailText) {
    result.push(tailText)
  }

  return result
}

/**
 * Process array with placeholders
 *
 * @param {Array[]} tokens - array with text and tokens
 * @param {any} placeholders - elements on replace
 * @param {boolean} [silent=false] - don't throw error on undefined
 * @returns [Array[]]
 */
export const proccessArrayWithPlaceholders = (tokens, placeholders, silent = false) =>
  tokens.map(item => {
    if (typeof item === 'string') return item
    const { key } = item
    if (!placeholders[key] && !silent) throw notEnoghtPlaceholders()
    return placeholders[key]
  })

export const mergePlaceholders = (original, fallback) => {
  if (!fallback) return original
  if (Array.isArray(original)) {
    if (!Array.isArray(fallback)) throw notSuitablePlaceholders()

    return original.concat(fallback)
  }

  if (Array.isArray(fallback)) throw notSuitablePlaceholders()
  return Object.assign({}, fallback, original)
}
