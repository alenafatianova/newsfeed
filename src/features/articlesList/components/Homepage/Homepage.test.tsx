import React from 'react'
import { render, screen } from '@testing-library/react'
import { Homepage } from './Homepage'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { reducer } from '@components/store'

describe('Homepage', () => {
  beforeEach(() => {
    // server.use(
    //rest.get(`${API_ENDPOINT}${API_VERSION}/categories`, (res, ctx) => {
    //       return(res(ctx.json(
    //   [
    //     {
    //         "id": 1,
    //         "name": "tech"
    //     },
    //     {
    //         "id": 2,
    //         "name": "sport"
    //     },
    //     {
    //         "id": 3,
    //         "name": "fashion"
    //     },
    //     {
    //         "id": 4,
    //         "name": "politics"
    //     },
    //     {
    //         "id": 5,
    //         "name": "other"
    //     },
    //     {
    //         "id": 6,
    //         "name": "karpov.courses"
    //     }
    // ]
    // )))
    //}
    //rest.get(`${API_ENDPOINT}${API_VERSION}/sources`, (res, ctx) => {
    //       return(res(ctx.json(
    //   [
    //     {
    //       "id": 1,
    //       "name": "meduza"
    //   },
    //   {
    //       "id": 6,
    //       "name": "3dnews"
    //   },
    //   {
    //       "id": 7,
    //       "name": "nytimes"
    //   },
    //   {
    //       "id": 8,
    //       "name": "forbes"
    //   },
    //   {
    //       "id": 9,
    //       "name": "igromania"
    //   },
    //   {
    //       "id": 10,
    //       "name": "buro237"
    //   },
    //   {
    //       "id": 11,
    //       "name": "rusvesna"
    //   },
    //   {
    //       "id": 12,
    //       "name": "7ya"
    //   },
    //   {
    //       "id": 14,
    //       "name": "aif"
    //   },
    //   {
    //       "id": 15,
    //       "name": "gazetaru"
    //   },
    //   {
    //       "id": 16,
    //       "name": "karpov.courses"
    //   }
    // ]
    // ))
    // )
    // )

    const store = configureStore({ reducer })

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Homepage />
        </Provider>
      </MemoryRouter>
    )
  })

  test('Renders Skeleton before data was loaded', () => {
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
    expect(screen.queryByTestId('home-page')).toBeNull()
  })

  test('Renders Homepage after data was loaded', async () => {
    expect(await screen.findByTestId('home-page')).toBeInTheDocument()
    expect(screen.queryByTestId('skeleton')).toBeNull()
  })
})
