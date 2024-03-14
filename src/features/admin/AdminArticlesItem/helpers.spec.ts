import { getErrors } from './helpers'
import { InputError, InputNameType } from './types'

// Fields cannot be empty
// Title should be up to 20 symbols
// Description should be up to 140 symbols
// Text's body should be min of 140 symbols

describe('getErrors', () => {
  let data: [InputNameType, FormDataEntryValue][] = []

  beforeEach(() => {
    data = [
      ['company-name', 'Google'],
      ['articleTitle', 'Title'],
      ['description', 'Description which is up to 140 symbols description description description'],
      [
        'text',
        'loren ipsum loren ipsum loren ipsumloren loren ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum ipsum loren ipsum loren ipsum loren ipsum loren ipsum',
      ],
      ['image', 'https://corndog.png'],
    ]
  })

  test('Returns object w/o errors if right data was provided', async () => {
    // Arrange
    const errors: InputError = {
      'company-name': '',
      articleTitle: '',
      description: '',
      text: '',
      image: '',
    }

    // Act
    const results = await getErrors(data)
    // Assert
    expect(results).toEqual(errors)
  })

  test('Return an error in [company-name] field if the value is empty', async () => {
    data = data.map((item) => {
      if (item[0] === 'company-name') {
        return [item[0], '']
      }
      return item
    })
    const errors = await getErrors(data)

    expect(errors['company-name'].length).toBeGreaterThan(0)
  })

  test.each([
    { name: 'company-name' as InputNameType },
    { name: 'articleTitle' as InputNameType },
    { name: 'description' as InputNameType },
    { name: 'text' as InputNameType },
    { name: 'image' as InputNameType },
  ])('Return an error in $name field if the value is empty', async ({ name }) => {
    data = data.map((item) => {
      if (item[0] === name) {
        return [item[0], '']
      }
      return item
    })
    const errors = await getErrors(data)

    expect(errors[name].length).toBeGreaterThan(0)
  })

  test('Return error if title is more than 20 symbols', async () => {
    data = data.map((item) => {
      if (item[0] === 'articleTitle') {
        return [item[0], 'articleTitle']
      }
      return item
    })
    const errors = await getErrors(data)

    expect(errors['articleTitle'].length).toBeLessThan(20)
  })

  test('Return error if description is more than 140 symbols', async () => {
    data = data.map((item) => {
      if (item[0] === 'description') {
        return [item[0], 'description description description description description description description']
      }
      return item
    })
    const errors = await getErrors(data)

    expect(errors['description'].length).toBeLessThan(140)
  })
})
