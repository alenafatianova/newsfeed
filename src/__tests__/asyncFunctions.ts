const asyncFn = (callback: (message: string) => any) => {
  setTimeout(() => {
    callback('Okay')
  }, 2000)
}

const promiseFn = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('ok')
    }, 2000)
  })
}

const manyTimeouts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(1)
    }, 1000)

    setTimeout(() => {
      console.log(2)
    }, 3000)

    setTimeout(() => {
      console.log(3)
    }, 4000)

    setTimeout(() => {
      console.log(4)
      resolve('ok')
    }, 2000)
  })
}

const getData = async () => {
  const users = await fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((data) => console.log(data))

  return users
}

describe('Server data: ', () => {
  test('Get users from a server', async () => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    ) as jest.Mock

    const data = await getData()

    expect(data).toBe(2)
  })
})

describe.skip('Async functions', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('Async fn works', (done) => {
    asyncFn((message) => {
      expect(message).toBe('Okay')
      done()
    })
  })

  test.only('Promise function: resolves with message okay', () => {
    jest.useFakeTimers()
    const promise = promiseFn()
    jest.runAllTimers()

    return expect(promise).resolves.toBe('ok')
  })

  test('Many timeouts fn', () => {
    const promise = manyTimeouts()

    jest.advanceTimersByTime(3000)

    return expect(promise).resolves.toBe('ok')
  })
})
