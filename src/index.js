import { createMediaQuery, px, isObject, isArray, num } from 'styled-system'
import styled from 'styled-components'

// nb. loosely based on styled-system equivalent
const getValue = (n, scaling) => {
  if (!num(n)) {
    return px(scaling[n] || n)
  }
  const value = scaling[n]
  if (!num(value)) {
    return value
  }
  return value === 0 ? 0 : px(value)
}

// nb. also loosely based on styled-system `getStyles`
// see: https://github.com/jxnblk/styled-system/pull/341
const createCss = ({ breakpoints, spacing }, value, cssFn) => {
  const css = v => cssFn(getValue(v, spacing))

  // Scalar
  if (!isObject(value)) {
    return css(value)
  }

  // Arrays
  if (isArray(value) && isArray(breakpoints)) {
    let out = css(value[0])
    for (let i = 1; i < value.length; i += 1) {
      const rule = css(value[i])
      if (rule) {
        const mediaQuery = createMediaQuery(breakpoints[i - 1])
        out += `${mediaQuery} { ${rule} }\n`
      }
    }
    return out
  }

  // Objects
  let out = ''
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const breakpoint in value) {
    const minWidth = breakpoints[breakpoint]
    if (!minWidth) {
      out += css(value[breakpoint])
    } else {
      const rule = css(value[breakpoint])
      const mediaQuery = createMediaQuery(minWidth)
      out += `${mediaQuery} { ${rule} }\n`
    }
  }
  return out
}

const cssForGap = value => `
  margin: -${value};
  > * {
    padding: ${value};
  }
`

const cssForRowGap = value => `
  margin-top: -${value};
  margin-bottom: -${value};
  > * {
    padding-top: ${value};
    padding-bottom: ${value};
  }
`

const cssForColGap = value => `
  margin-left: -${value};
  margin-right: -${value};
  > * {
    padding-left: ${value};
    padding-right: ${value};
  }
`

export const gridGap = props => createCss(props.theme, props.gap, cssForGap)

export const gridRowGap = props =>
  createCss(props.theme, props.rowGap, cssForRowGap)

export const gridColGap = props =>
  createCss(props.theme, props.colGap, cssForColGap)

export const gridGaps = props => {
  if (props.gap !== undefined) return gridGap(props)
  if (props.rowGap !== undefined) return gridRowGap(props)
  if (props.colGap !== undefined) return gridColGap(props)
  return undefined
}

const Grid = styled.div`
  ${gridGaps};
`

export default Grid
