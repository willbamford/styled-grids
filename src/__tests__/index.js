import React from 'react'
import { cleanup, render } from 'react-testing-library'
// import renderer from 'react-test-renderer'
// import 'jest-styled-components'

import Grid, { gridGaps } from '..'

afterEach(cleanup)

expect.extend({
  toMatchCss(received, expected) {
    const norm = s => (s ? s.replace(/\s+/g, ' ').trim() : '')

    const pass = norm(received) === norm(expected)
    if (pass) {
      return {
        message: () => `expected ${received} not to equal ${expected}`,
        pass: true,
      }
    }

    return {
      message: () => `expected ${received} to equal ${expected}`,
      pass: false,
    }
  },
})

describe('styled-grids', () => {
  describe('<Grid />', () => {
    it('should match the snapshot', () => {
      const { asFragment } = render(<Grid />)
      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('gridGaps', () => {
    describe('with gap set directly', () => {
      const props = {
        theme: {
          spacing: [0, 4, 8],
        },
      }
      it('should accept gap prop', () => {
        expect(gridGaps({ ...props, gap: '3rem' })).toMatchCss(`
          margin: -3rem;
          > * {
            padding: 3rem;
          }
        `)
      })

      it('should accept rowGap prop', () => {
        expect(gridGaps({ ...props, rowGap: '3rem' })).toMatchCss(`
          margin-top: -3rem;
          margin-bottom: -3rem;
          > * {
            padding-top: 3rem;
            padding-bottom: 3rem;
          }
        `)
      })

      it('should accept colGap prop', () => {
        expect(gridGaps({ ...props, colGap: '3rem' })).toMatchCss(`
          margin-left: -3rem;
          margin-right: -3rem;
          > * {
            padding-left: 3rem;
            padding-right: 3rem;
          }
        `)
      })
    })

    describe('with gap set from theme spacing', () => {
      const props = {
        theme: {
          spacing: [0, 4, 8],
        },
      }
      it('should accept gap prop', () => {
        expect(gridGaps({ ...props, gap: 1 })).toMatchCss(`
          margin: -4px;
          > * {
            padding: 4px;
          }
        `)
      })

      it('should accept rowGap prop', () => {
        expect(gridGaps({ ...props, rowGap: 1 })).toMatchCss(`
          margin-top: -4px;
          margin-bottom: -4px;
          > * {
            padding-top: 4px;
            padding-bottom: 4px;
          }
        `)
      })

      it('should accept colGap prop', () => {
        expect(gridGaps({ ...props, colGap: 1 })).toMatchCss(`
          margin-left: -4px;
          margin-right: -4px;
          > * {
            padding-left: 4px;
            padding-right: 4px;
          }
        `)
      })
    })

    describe('with gap and breakpoints as array', () => {
      const props = {
        theme: {
          breakpoints: ['20em', '40em'],
          spacing: [0, 4, 8],
        },
      }

      it('should accept gap array prop', () => {
        expect(gridGaps({ ...props, gap: [2, 0, 1] })).toMatchCss(`
          margin: -8px;
          > * {
            padding: 8px;
          }

          @media screen and (min-width: 20em) {           
            margin: -0;
            > * {
              padding: 0;
            }
          }
                  
          @media screen and (min-width: 40em) {  
            margin: -4px;
            > * {
              padding: 4px;
            }
          }
        `)
      })
    })

    describe('with gap and breakpoints as object', () => {
      const props = {
        theme: {
          breakpoints: { xs: 0, md: '20em', lg: '40em' },
          spacing: [0, 4, 8],
        },
      }

      it('should accept gap object prop', () => {
        expect(
          gridGaps({
            ...props,
            gap: { xs: 2, md: 1, lg: 0 },
          }),
        ).toMatchCss(`
          margin: -8px;
          > * {
            padding: 8px;
          }

          @media screen and (min-width: 20em) {           
            margin: -4px;
            > * {
              padding: 4px;
            }
          }
                  
          @media screen and (min-width: 40em) {  
            margin: -0;
            > * {
              padding: 0;
            }
          }
        `)
      })
    })
  })
})
