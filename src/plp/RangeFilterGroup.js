import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { Slider } from '@material-ui/core'
import SearchResultsContext from './SearchResultsContext'
import debounce from 'lodash/debounce'

const debouncedSetByDiscountFilter = debounce(callback => {
  callback()
}, 700)

/**
 * A UI for grouping filters using checkboxes.
 */
export default function CheckboxFilterGroup(props) {
  const {
    pageData: { by_discount },
    actions: { setByDiscountFilter, applyByDiscountFilter },
  } = useContext(SearchResultsContext)

  return (
    <Slider
      value={[by_discount ? by_discount.min : 0, by_discount ? by_discount.max : 100]}
      min={0}
      max={100}
      step={5}
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
      onChange={(_event, value) => {
        setByDiscountFilter(value[0], value[1])
        debouncedSetByDiscountFilter(applyByDiscountFilter)
      }}
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
