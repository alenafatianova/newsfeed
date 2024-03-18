const concatWords = (words: string[]): string => {
  // const filterWords = () => words.filter(Boolean).map((word: string, i: number) => {
  //   if (i === 0) {
  //     return `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`
  //    } else {
  //     return word.toLowerCase()
  //    }
  // })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // const formatter = new Intl.ListFormat('ru',
  //   {
  //     style: 'long',
  //     type: 'conjunction'
  // })
  // return formatter.format(filterWords)

  const result: string[] = []

  words.forEach((word: string, i: number) => {
    if (!word.length) {
      return
    }
    if (i === 0) {
      result.push(`${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
    } else {
      result.push(word.toLowerCase())
    }
  })

  if (!result.length) {
    return ''
  }

  if (result.length === 1) {
    return result[0]
  }

  if (result.length === 2) {
    return result.join(' и ')
  }
  return `${result?.slice(0, -1).join(', ')} и ${result[result.length - 1]}`
}

describe('Concat words', () => {
  test('[Яблоки, персики, груши] -> Яблоки, персики, груши', () => {
    const words = ['Яблоки', 'персики', 'груши']
    const result = concatWords(words)

    expect(result).toBe('Яблоки, персики и груши')
  })

  test('Первая буква всегда заглавная -> Яблоки, персики, груши', () => {
    const words = ['яблоки', 'персики', 'груши']
    const result = concatWords(words)

    expect(result).toBe('Яблоки, персики и груши')
  })

  test('Все буквы маленькие кроме первой -> Яблоки, персики, груши', () => {
    const words = ['яБлоКи', 'ПерСики', 'грУши']
    const result = concatWords(words)

    expect(result).toBe('Яблоки, персики и груши')
  })

  test('Возвращает одно слово, если передано только одно слово -> Яблоки', () => {
    const words = ['Яблоки']
    const result = concatWords(words)

    expect(result).toBe('Яблоки')
  })

  test('Если дано два слово, то поставить между ними букву и -> Яблоки и персики', () => {
    const words = ['Яблоки', 'персики']
    const result = concatWords(words)

    expect(result).toBe('Яблоки и персики')
  })

  test('Возвращает пустую строку, если передать массив пустых строк', () => {
    const words = ['', '', '']
    const result = concatWords(words)

    expect(result).toBe('')
  })
})
