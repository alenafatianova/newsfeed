import { Button } from './Button'
import { render, screen } from '@testing-library/react'
import React from 'react'
import userEvent from '@testing-library/user-event'

describe('Button', () => {
  test('Render button', () => {
    render(<Button>Heello</Button>)
    expect(screen.getByText(/Heello/i)).toBeInTheDocument()
  })

  test('Renders spinner while loading', () => {
    render(<Button loading>Heello</Button>)

    expect(screen.getByAltText('button_spinner')).toBeInTheDocument()
  })

  test('Calls onClick when button is clicked', () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Heello</Button>)

    userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(0)
  })

  test('Do not calls onClick while loading', () => {
    const onClick = jest.fn()
    render(
      <Button loading onClick={onClick}>
        Heello
      </Button>
    )

    expect(onClick).not.toHaveBeenCalled()
  })
})
