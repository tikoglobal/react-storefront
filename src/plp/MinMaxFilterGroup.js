import PropTypes from 'prop-types'
import React, { useMemo, useContext, useState } from 'react'
import { FormGroup, TextField, IconButton, Box } from '@material-ui/core'
import { ArrowForwardIos } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import SearchResultsContext from './SearchResultsContext'

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

  field: {
    marginRight: '6px',
  },
})

const useStyles = makeStyles(styles, { name: 'RSFCheckboxFilterGroup' })

export default function MinMaxFilterGroup(props) {
  const {
    pageData: { by_price_per_net_content },
    actions: {
      setByPricePerNetContentFilterMin,
      setByPricePerNetContentFilterMax,
      applyByPricePerNetContentFilter,
    },
  } = useContext(SearchResultsContext)

  const classes = useStyles(props.classes)

  return (
    <FormGroup>
      <Box display="flex">
        <TextField
          value={by_price_per_net_content ? by_price_per_net_content.min : ''}
          variant="filled"
          label="$ Min"
          onChange={event => setByPricePerNetContentFilterMin(event.target.value)}
          className={classes.field}
          margin="dense"
          size="small"
        />
        <TextField
          value={by_price_per_net_content ? by_price_per_net_content.max : ''}
          variant="filled"
          label="$ Max"
          onChange={event => setByPricePerNetContentFilterMax(event.target.value)}
          className={classes.field}
          margin="dense"
          size="small"
        />
        <IconButton aria-label="Apply" onClick={() => applyByPricePerNetContentFilter(true)}>
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </FormGroup>
  )
}
//<button onClick={() => setByPricePerNetContentFilter(9, 31, true)}>Set Filter</button>
MinMaxFilterGroup.propTypes = {
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
