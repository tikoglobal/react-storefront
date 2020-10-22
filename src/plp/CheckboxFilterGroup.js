import PropTypes from 'prop-types'
import React, { useMemo, useContext, useState } from 'react'
import { Checkbox, FormGroup, Link, FormControlLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchResultsContext from './SearchResultsContext'
import take from 'lodash/take'

const styles = theme => ({
  /**
   * Styles applied to the matching text.
   */
  matches: {
    marginLeft: '5px',
    display: 'inline',
  },
  /**
   * Styles applied to the group label element.
   */
  groupLabel: {
    display: 'flex',
    alignItems: 'center',
  },

  loadMoreLink: {
    paddingLeft: '30px',
  },
})

const useStyles = makeStyles(styles, { name: 'RSFCheckboxFilterGroup' })

/**
 * A UI for grouping filters using checkboxes.
 */
export default function CheckboxFilterGroup(props) {
  const [showMore, setShowMore] = useState(false)
  const { group, submitOnChange } = props
  const {
    pageData: { filters },
    actions: { toggleFilter },
  } = useContext(SearchResultsContext)

  const classes = useStyles(props.classes)

  return useMemo(
    () => (
      <FormGroup>
        {take(group.options, 5).map((facet, i) => (
          <FormControlLabel
            key={i}
            label={
              <div className={classes.groupLabel}>
                <span>{facet.name}</span>
              </div>
            }
            control={
              <Checkbox
                checked={filters.indexOf(facet.code) !== -1}
                color="primary"
                onChange={() => toggleFilter(facet, submitOnChange)}
              />
            }
          />
        ))}
        {group.options.length > 5 &&
          showMore === true &&
          group.options.slice(5).map((facet, i) => (
            <FormControlLabel
              key={i}
              label={
                <div className={classes.groupLabel}>
                  <span>{facet.name}</span>
                </div>
              }
              control={
                <Checkbox
                  checked={filters.indexOf(facet.code) !== -1}
                  color="primary"
                  onChange={() => toggleFilter(facet, submitOnChange)}
                />
              }
            />
          ))}
        {group.options.length > 5 && showMore === false ? (
          <Link
            href="#"
            onClick={() => setShowMore(true)}
            className={classes.loadMoreLink}
            variant="caption"
          >
            See all...
          </Link>
        ) : null}
        {group.options.length > 5 && showMore === true ? (
          <Link
            href="#"
            onClick={() => setShowMore(false)}
            className={classes.loadMoreLink}
            variant="caption"
          >
            See less...
          </Link>
        ) : null}
      </FormGroup>
    ),
    [...Object.values(props), filters, showMore],
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
