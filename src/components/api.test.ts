import { partnerArticleStub } from '@features/partnersArticles/components/stubs'
import { getPartnerArticle } from './api'
import MockFirestore from '../__mocks__/firebase/firestore'

describe('getPartnerArticle', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  test('Returns article after loading', async () => {
    const id = '1'
    MockFirestore.getDoc.mockResolvedValue({
      exists: () => true,
      data: () => partnerArticleStub,
      id,
    } as any)

    const article = await getPartnerArticle(id)

    expect(article).toEqual({
      id: 1,
      ...partnerArticleStub,
    })
  })

  test('Returns error if article does not exists', async () => {
    const id = '1'
    const article = getPartnerArticle(id)
    await expect(article).rejects.toThrow()
  })
})
