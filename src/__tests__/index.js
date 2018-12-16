import React from 'react'
import { cleanup, render } from 'react-testing-library'
// import renderer from 'react-test-renderer'
// import 'jest-styled-components'

import Grid from '..'

afterEach(cleanup)

describe('styled-grids', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<Grid />)
    expect(asFragment()).toMatchSnapshot()
  })

  // it('should respect the "as" prop', () => {
  //   const tree = renderer.create(<Grid as="ul" />)
  //   console.log(tree.root.children[0].props)
  //   // console.log(tree)
  // })
})
