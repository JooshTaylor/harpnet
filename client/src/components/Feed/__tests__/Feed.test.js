import React from 'react'
import { renderWithRedux, cleanup } from '../../../test/hn-test-utils'
import Feed from '../Feed'

it('renders without crashing', () => {
  const { getByTestId, getByText } = renderWithRedux(<Feed />)

  const component = getByTestId('feed')

  expect(component).not.toBeNull()
})
