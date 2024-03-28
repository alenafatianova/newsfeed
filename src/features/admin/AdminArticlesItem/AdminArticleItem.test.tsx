import { PartnersArticlesFirebaseStub } from '@features/partnersArticles/components/stubs'
import { getDoc } from '../../../__mocks__/firebase/firestore'
import { AdminArticlesItem } from './AdminArticlesItem'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom'

describe('Admin Articles Item', () => {
  beforeEach(() => {
    const id = '1'
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => PartnersArticlesFirebaseStub,
      id: id,
    })
  })

  afterEach(() => jest.resetAllMocks())

  test('Renders form after loading', async () => {
    render(
      <MemoryRouter initialEntries={['/2']}>
        <Route path="/:id">
          <AdminArticlesItem />
        </Route>
      </MemoryRouter>
    )

    const companyName = await screen.findByDisplayValue(/Horses and Bosses/i)
    const articleTitle = screen.findByDisplayValue(/This is a great title!/i)
    const description = screen.findByDisplayValue(
      /This description consists from letters and words and contains some random information/i
    )

    expect(companyName).toBeInTheDocument()
    expect(articleTitle).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })
})
