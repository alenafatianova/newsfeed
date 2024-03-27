import axios from 'axios'
import { Users, getUserName } from '../users'
import * as utils from './utils'

// jest.mock('./utils', () => ({
//   modifyName: () => 'Vasya Pupkin'
// }))
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('get users name: ', () => {
  beforeEach(() => {
    const user: Partial<Users> = {
      name: 'Clementine Bauch',
    }
    //axios.get = jest.fn().mockResolvedValue({data: user})
    mockedAxios.get.mockResolvedValue({ data: user })

    jest.spyOn(utils, 'modifyName')
  })
  test('Returns name when function called', async () => {
    const id = 3
    const name = await getUserName(id)
    expect(name).toBe('Clementine Bauch')
    expect(utils.modifyName).toHaveBeenCalledTimes(2)
  })
})
