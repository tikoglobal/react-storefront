import React from 'react'
import { mount } from 'enzyme'
import CartButton from '@tikoglobal/react-storefront/CartButton'
import Link from '@tikoglobal/react-storefront/link/Link'
import ToolbarButton from '@tikoglobal/react-storefront/ToolbarButton'
import { AddShoppingCart as CustomIcon } from '@material-ui/icons'
import { Badge } from '@material-ui/core'

describe('CartButton', () => {
  let wrapper

  afterEach(() => {
    wrapper.unmount()
  })

  it('should be able to use custom icon', () => {
    wrapper = mount(<CartButton icon={<CustomIcon />} />)

    expect(wrapper.find(CustomIcon).exists()).toBe(true)
  })

  it('should show provided quantity', () => {
    wrapper = mount(<CartButton quantity={10} />)

    expect(wrapper.find(Badge).text()).toBe('10')
  })

  it('should accept custom href', () => {
    wrapper = mount(<CartButton href="/test" />)

    expect(wrapper.find(Link).prop('href')).toBe('/test')
  })

  it('should spread link, button and  badge props', () => {
    wrapper = mount(
      <CartButton
        badgeProps={{
          color: 'secondary',
        }}
        buttonProps={{
          color: 'secondary',
        }}
        linkProps={{
          anchorProps: { color: 'secondary' },
        }}
      />,
    )

    expect(wrapper.find(Link).prop('color')).toBe('secondary')
    expect(wrapper.find(Badge).prop('color')).toBe('secondary')
    expect(wrapper.find(ToolbarButton).prop('color')).toBe('secondary')
  })
})
