import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { PartnersArticles } from './PartnersArticles'
import { server, rest } from '__mocks__/__msw__'
import { PartnersArticlesFirebaseStub } from './stubs'
import { HttpResponse } from 'msw'

describe('Partner article test', () => {
  test('Renders component after loading', async () => {
    server.use(
      rest.get(
        'https://firestore.googleapis.com/v1/projects/karpov-news-1b158/databases/:id/documents/partners-posts',
        () => {
          return HttpResponse.json(PartnersArticlesFirebaseStub)
        }
      )
    )

    render(<PartnersArticles />)

    const article = await screen.findByTestId('article')
    const companyName = screen.getByText(/habr/i)
    const image = screen.getByAltText('Фотография статьи')
    const title = screen.getByText(/Оптимизация производительности фронтенда/i)
    const description = screen.getByText(/Что такое Lorem Ipsum/i)

    expect(article).toBeInTheDocument()
    expect(companyName).toBeInTheDocument()
    expect(image).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  test('Does not render article component', async () => {
    server.use(
      rest.get(
        'https://firestore.googleapis.com/v1/projects/karpov-news-1b158/databases/:id/documents/partners-posts',
        () => {
          return HttpResponse.json()
        }
      )
    )

    await waitFor(() => {
      expect(screen.queryByTestId('article'))
    })
    render(<PartnersArticles />)
  })
})
