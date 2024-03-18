const checkData = (data: number, onSuccess: (message: string) => any) => {
  if (data === 2) {
    onSuccess('ok')
  } else {
    onSuccess('not ok')
  }
}

describe('check Data:', () => {
  test('return onSuccess result: okay or not okay', () => {
    //const onSuccess = (message: string) => console.log(message)
    const data = 2
    const onSuccess = jest.fn()

    checkData(data, onSuccess)

    expect(onSuccess).toHaveBeenCalled()
    //expect(onSuccess).toHaveBeenCalledWith(2)
    //expect(onSuccess).toHaveReturnedWith(2)
  })

  test('jest Fn', () => {
    const mock = jest.fn()
  })
})

export const modifyName = (name: string): string => {
  return `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`
}
