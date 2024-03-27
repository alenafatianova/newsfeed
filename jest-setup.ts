import '@testing-library/jest-dom'
import 'whatwg-fetch'
import { server } from './src/__mocks__/__msw__'

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
