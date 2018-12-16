import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Grid from '..'

describe('styled-grids', () => {
  it('should match the snapshot', () => {
    const tree = renderer.create(<Grid />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
