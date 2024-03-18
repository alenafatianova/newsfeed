import { PartnersPostsType } from '../types'

export const partnerArticleStub: Omit<PartnersPostsType, 'id'> = {
  image: '',
  'company-name': 'Horses and Bosses',
  articleTitle: 'This is a great title!',
  description: 'This description consists from letters and words and contains some random information',
  created: {
    seconds: new Date().getSeconds(),
    nanoseconds: new Date().getMilliseconds(),
  },
  text: 'Some text',
}
