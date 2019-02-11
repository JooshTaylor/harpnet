import React from 'react'
import {
  renderWithRedux,
  renderWithRouter,
  cleanup,
  fireEvent
} from '../../../../test/hn-test-utils'
import PubAcc from '../PubAcc'
import Login from '../../../Login/Login'

it('logs a user in', async () => {
  // const {
  //   getByTestId,
  //   getByText,
  //   getByAltText,
  //   finishLoading
  // } = renderWithRouter(
  //   <>
  //     <Login path='/login' />
  //     <PubAcc />
  //   </>
  // )
  // const HarperAccountButton = getByTestId('acc1')
  // fireEvent.click(HarperAccountButton)
  // await finishLoading()
  // const url = window.location.href
  // expect(url).toContain('feed')
})
