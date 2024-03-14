const checkData = (data: number, onSuccess: (message: string) => any) => {
  if (data === 2) {
    onSuccess('ok')
  } else {
    onSuccess('not ok')
  }
}

describe('check Data:', () => {
  test('return onSuccess result: oka or not okay', () => {
    //const onSuccess = (message: string) => console.log(message)

    const onSuccess = jest.fn()
    const data = 2

    checkData(data, onSuccess)

    expect(onSuccess).toHaveBeenCalled()
    expect(onSuccess).toHaveBeenCalledWith(2)
    expect(onSuccess).toHaveReturnedWith('ok')
  })

  test('jest Fn', () => {
    const mock = jest.fn()
  })
})
