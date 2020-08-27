import PropTypes from 'prop-types'
import React, { useMemo, useContext, useState } from 'react'
import { FormGroup, TextField, Box, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchResultsContext from './SearchResultsContext'
import NavigateNext from "@material-ui/icons/NavigateNext";


const styles = theme => ({
  container: {
    display: 'flex',
  },
  input: {
    flex: 1,
  },
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
  root: {
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginBottom: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
})

const useStyles = makeStyles(styles, { name: 'RSFRangeFilterGroup' })

/**
 * A UI for grouping filters using a slider.
 */
export default function RangeFilterGroup(props) {
  const { group, submitOnChange } = props
  const {
    pageData: { filters },
    actions: { toggleFilter },
  } = useContext(SearchResultsContext)
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const classes = useStyles(props.classes)
  
  return (
      <FormGroup>
        <TextField
          className={classes.input}
          size="small"
          value={min}
          label="Minimum"
          onChange={(event) => setMin(event.target.value)}
        />
        <TextField
          className={classes.input}
          size="small"
          value={max}
          label="Maximum"
          onChange={(event) => setMax(event.target.value)}
        />        
      </FormGroup>
      // <FormGroup>
      //   {group.options.map((facet, i) => (
      //     <FormControlLabel
      //       key={i}
      //       label={
      //         <div className={classes.groupLabel}>
      //           <span>{facet.name}</span>
      //           <Typography variant="caption" className={classes.matches} component="span">
      //             ({facet.matches})
      //           </Typography>
      //         </div>
      //       }
      //       control={
      //         <Checkbox
      //           checked={filters.indexOf(facet.code) !== -1}
      //           color="primary"
      //           onChange={() => toggleFilter(facet, submitOnChange)}
      //         />
      //       }
      //     />
      //   ))}
      // </FormGroup>
  )
}

RangeFilterGroup.propTypes = {
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
