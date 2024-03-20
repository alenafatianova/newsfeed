import React from 'react'
import { render, screen } from '@testing-library/react'
import { PartnersArticles } from './PartnersArticles'


describe('Partner article test', () => {

  test('Renders component after loading', async () => {
    render(<PartnersArticles />)

    const article = await screen.findByTestId('article')
    // const companyName = screen.getByText(/рога и копыта/)
    // const image = screen.getByAltText('Фотография статьи')
    // const title = screen.getByText(/name article/)
    // const description = screen.getByText(/artcile text/)

    expect(article).toBeInTheDocument()
    // expect(companyName).toBeInTheDocument()
    // expect(image).toBeInTheDocument()
    // expect(title).toBeInTheDocument()
    // expect(description).toBeInTheDocument()
  })


  test('Does not render article component', () => {
    render //
  })
})