// // import React from 'react'
// import { createMediaQuery, px } from 'styled-system'
import styled from 'styled-components'

// // // Move to primitives / system folder?
// // // const applyMinMediaQueryCssAtBreakpoints = (breakpoints, apply) =>
// // //   Object.keys(breakpoints)
// // //     .map(bp => {
// // //       const value = breakpoints[bp]
// // //       if (value === undefined) {
// // //         // eslint-disable-next-line no-console
// // //         console.warn(`Warning: breakpoint '${bp}' does not exist`)
// // //         return ''
// // //       }
// // //       return bp === DEFAULT
// // //         ? apply(bp)
// // //         : `
// // //             ${createMediaQuery(value)} {
// // //               ${apply(bp)}
// // //             }
// // //           `
// // //     })
// // //     .join('')

// // // const gapBreakpoints = (gap, breakpoints) =>
// // //   Object.keys(gap).reduce(
// // //     (prev, curr) => ({ ...prev, ...{ [curr]: breakpoints[curr] } }),
// // //     {},
// // //   )

const cssForGap = value => `
  margin: -${value}px;
  > * {
    padding: ${value}px;
  }
`

const cssForRowGap = value => `
  margin-top: -${value}px;
  margin-bottom: -${value}px;
  > * {
    padding-top: ${value}px;
    padding-bottom: ${value}px;
  }
`

const cssForColGap = value => `
  margin-left: -${value}px;
  margin-right: -${value}px;
  > * {
    padding-left: ${value}px;
    padding-right: ${value}px;
  }
`

const applyGridGap = ({ breakpoints, spacing }, gap, cssForGapFn) => {
  if (gap === undefined) {
    return undefined
  }
  // if (typeof gap === 'object') {
  //   return applyMinMediaQueryCssAtBreakpoints(
  //     gapBreakpoints(gap, breakpoints),
  //     breakpoint => cssForGapFn(spacing[gap[breakpoint]]),
  //   )
  // }
  return cssForGapFn(spacing[gap])
}

const gridGap = props => applyGridGap(props.theme, props.gap, cssForGap)

const gridRowGap = props =>
  applyGridGap(props.theme, props.rowGap, cssForRowGap)

const gridColGap = props =>
  applyGridGap(props.theme, props.colGap, cssForColGap)

const Grid = styled.div`
  background-color: pink;
  ${gridGap};
  ${gridRowGap};
  ${gridColGap};
`

// const Grid = 'fo'

export default Grid
