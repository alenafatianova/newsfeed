import { setupServer } from 'msw/node'
import msw from 'msw'

//export const server = setupServer()
export const rest = msw.http
