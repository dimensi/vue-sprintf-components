import {
  parseTextOnArray,
  createArgsRegexp,
  createNamedRegexp,
  proccessArrayWithPlaceholders,
  mergePlaceholders,
} from '../src/utils'

const testText = 'My testing text with {0} and {1}'
const testText2 = 'My {0} text'
const testTextWithNamed = 'My testing text with {first} and {second}'
const goodResultForParseText = ['My testing text with ', { key: '0' }, ' and ', { key: '1' }]

describe('parsing text', () => {
  test('parse text on array with args', () => {
    const result = parseTextOnArray(testText, createArgsRegexp())
    expect(result).toEqual(
      goodResultForParseText
    )

    const result2 = parseTextOnArray(testText2, createArgsRegexp())
    expect(result2).toEqual(
      ['My ', {key: '0'}, ' text']
    )
  })

  test('parse text on array with named', () => {
    const result = parseTextOnArray(testTextWithNamed, createNamedRegexp())
    expect(result).toEqual(
      ['My testing text with ', { key: 'first' }, ' and ', { key: 'second' }]
    )
  })

  test('testing with used regexp', () => {
    const regexp = createArgsRegexp()
    for (let x = 0; x < 10; x++) {
      const result = parseTextOnArray(testText, regexp)
      expect(result).toEqual(
        goodResultForParseText
      )
    }
  })

  test('fill array with args placeholders', () => {
    const placeholders = ['Placeholder 1', 'Placeholder 2']
    const parsedText = parseTextOnArray(testText, createArgsRegexp())
    const filledArray = proccessArrayWithPlaceholders(parsedText, placeholders)

    expect(filledArray).toEqual(
      ['My testing text with ', 'Placeholder 1', ' and ', 'Placeholder 2']
    )
  })

  test('fill array with named placeholders', () => {
    const placeholders = {
      first: 'Placeholder 1',
      second: 'Placeholder 2',
    }

    const parsedText = parseTextOnArray(testTextWithNamed, createNamedRegexp())
    const filledArray = proccessArrayWithPlaceholders(parsedText, placeholders)

    expect(filledArray).toEqual(
      ['My testing text with ', 'Placeholder 1', ' and ', 'Placeholder 2']
    )
  })

  test('throw error on not enoght placeholders', () => {
    const argsParse = () => {
      const placeholders = ['Placeholder 1']
      const parsedText = parseTextOnArray(testText, createArgsRegexp())
      return proccessArrayWithPlaceholders(parsedText, placeholders)
    }

    const namedParse = () => {
      const placeholders = {
        second: 'Placeholder 2',
      }

      const parsedText = parseTextOnArray(testTextWithNamed, createNamedRegexp())
      return proccessArrayWithPlaceholders(parsedText, placeholders)
    }

    expect(argsParse)
      .toThrowError('Not enought placeholders')

    expect(namedParse)
      .toThrowError('Not enought placeholders')
  })

  test('testing other regexps', () => {
    const testText = 'My testing text with %c and %c'
    const testTextWithNamed = 'My testing text with %(first)c and %(second)c'

    const result = parseTextOnArray(testText, /%c/g)
    expect(result).toEqual(goodResultForParseText)

    const resultNamed = parseTextOnArray(testTextWithNamed, /%\((\w+)\)c/g)
    expect(resultNamed).toEqual(['My testing text with ', { key: 'first' }, ' and ', { key: 'second' }])
  })

  test('return array with string if not have placeholders', () => {
    const testText = 'My testing text with nothing'
    const result = parseTextOnArray(testText, createArgsRegexp())
    expect(result).toEqual([testText])
  })

  test('merging slots with placeholders', () => {
    const slots = { a: '1', b: '2' }
    const fallback = { c: '3', b: '10' }
    const result = mergePlaceholders(slots, fallback)
    expect(result).toEqual({
      a: '1',
      b: '2',
      c: '3',
    })
  })

  test('merging children with array', () => {
    const children = [1, 2, 3]
    const fallback = [4, 5, 6]
    const result = mergePlaceholders(children, fallback)
    expect(result).toEqual([1, 2, 3, 4, 5, 6])
  })

  test('throw error if placeholders not suitable', () => {
    const first = () => {
      const slots = { a: '1', b: '2' }
      const fallback = [4, 5, 6]
      return mergePlaceholders(slots, fallback)
    }

    expect(first).toThrowError('Not suitable placeholders')
  })
})
