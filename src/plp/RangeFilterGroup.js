import PropTypes from 'prop-types'
import React, { useMemo, useContext, useState } from 'react'
import { Slider } from '@material-ui/core'
import SearchResultsContext from './SearchResultsContext'
import debounce from 'lodash/debounce'

const debouncedSetByDiscountFilter = debounce((callback, min, max) => {
  callback(min, max, true)
}, 700)

/**
 * A UI for grouping filters using checkboxes.
 */
export default function CheckboxFilterGroup(props) {
  const { group, submitOnChange } = props
  const {
    pageData: { by_discount },
    actions: { setByDiscountFilter },
  } = useContext(SearchResultsContext)

  console.log('render range')
  console.log(by_discount)

  let value = [0, 100]
  if (by_discount) {
    value = [by_discount.min, by_discount.max]
  }
  const [range, setRange] = useState(value)

  const updateRange = range => {
    setRange(range)
    debouncedSetByDiscountFilter(setByDiscountFilter, range[0], range[1])
  }

  if (value[0] !== range[0] || value[1] !== range[1]) {
    setRange([value[0], value[1]])
  }

  return (
    <Slider
      value={range}
      min={0}
      max={100}
      step={10}
      marks={[
        {
          value: 0,
          label: '0%',
        },
        {
          value: 100,
          label: '100%',
        },
      ]}
      onChange={(_event, value) => updateRange(value)}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider"
    />
  )
}

CheckboxFilterGroup.propTypes = {
  /**
   * Override or extend the styles applied to the component. See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * Contains data for the group to be rendered.
   */
  group: PropTypes.shape({
    options: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.string,
        name: PropTypes.string,
        matches: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        image: PropTypes.object,
      }),
    ),
  }),
  /**
   * Set to `true` to refresh the results when the user toggles a filter.
   */
  submitOnChange: PropTypes.bool,
}
