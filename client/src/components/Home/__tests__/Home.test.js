import React from 'react'
import { renderWithRedux, cleanup } from '../../../test/hn-test-utils'
import Home from '../Home'

it('renders without crashing', () => {
  const { getByText, getByTestId, getByAltText } = renderWithRedux(<Home />)

  const headingTextTest = 'Welcome to Harpnet'
  const publicAccountSrcTest = 'https://robohash.org/Harper/?200x200'

  const component = getByTestId('home')
  const headingNode = getByText(headingTextTest)
  const publicAccountNode = getByAltText('user1')

  expect(component).not.toBeNull()
  expect(headingNode.textContent).toContain(headingTextTest)
  expect(publicAccountNode.src).toMatch(publicAccountSrcTest)

  cleanup()
})
