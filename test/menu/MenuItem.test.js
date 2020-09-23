import React from 'react'
import { mount } from 'enzyme'
import MenuItem from '@tikoglobal/react-storefront/menu/MenuItem'
import Link from '@tikoglobal/react-storefront/link/Link'
import MenuContext from '@tikoglobal/react-storefront/menu/MenuContext'
import MenuLeaf from '@tikoglobal/react-storefront/menu/MenuLeaf'

describe('MenuItem', () => {
  let wrapper

  afterEach(() => {
    if (wrapper.exists()) {
      wrapper.unmount()
    }
  })

  const Test = ({ renderItem, ...props }) => {
    return (
      <MenuContext.Provider
        value={{
          renderItem,
          classes: {},
        }}
      >
        <MenuItem {...props} />
      </MenuContext.Provider>
    )
  }

  it('should render custom item', () => {
    wrapper = mount(<Test renderItem={() => 'hello'} item={{ href: 'test' }} />)
    expect(wrapper.text()).toBe('hello')
  })

  it('should render with pageData', () => {
    wrapper = mount(<Test item={{ pageData: { test: 'test' }, href: 'test' }} />)
    expect(wrapper.find(Link).prop('pageData')).toStrictEqual({ test: 'test' })
  })
})
