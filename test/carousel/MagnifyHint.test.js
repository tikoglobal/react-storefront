import React from 'react'
import { mount } from 'enzyme'
import MagnifyHint from '@tikoglobal/react-storefront/carousel/MagnifyHint'
import { Typography } from '@material-ui/core'

describe('MagnifyHint', () => {
  let wrapper

  afterEach(() => {
    wrapper.unmount()
  })

  it('should render with custom text', () => {
    wrapper = mount(
      <MagnifyHint
        zoomTextDesktop="zoomDesktop"
        expandTextMobile="mobile"
        expandTextDesktop="expandDekstop"
      />,
    )

    expect(
      wrapper
        .find(Typography)
        .at(0)
        .text(),
    ).toBe('zoomDesktop')
    expect(
      wrapper
        .find(Typography)
        .at(1)
        .text(),
    ).toBe('mobile')
    expect(
      wrapper
        .find(Typography)
        .at(2)
        .text(),
    ).toBe('expandDekstop')
  })
})
