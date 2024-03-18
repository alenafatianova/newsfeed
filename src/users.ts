import axios from 'axios'
import { modifyName } from './__tests__/utils'

export interface Users {
  id: number
  name: string
  username: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: number
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export const getUserName = async (id: number): Promise<string> => {
  const { data: user }: { data: Users } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)

  const [name, surname] = user.name.split(' ')
  return `${modifyName(name)} ${modifyName(surname)}`
}
