import React, { useEffect } from 'react'
import SearchResultsContext from './SearchResultsContext'
import PropTypes from 'prop-types'
import qs from 'qs'
import replaceState from '../router/replaceState'

/**
 * Provides context to filter, sorting, and pagination components.
 *
 * ```js
 *  import useSearchResultsStore from 'react-storefront/plp/useSearchResultsStore'
 *  import SearchResultsProvider from 'react-storefront/plp/SearchResultsProvider'
 *  import FilterButton from 'react-storefront/plp/FilterButton'
 *
 *  function Subcategory(lazyProps) {
 *    const [store, updateStore] = useSearchResultsStore(lazyProps)
 *
 *    return (
 *      <SearchResultsProvider store={store}>
 *        <FilterButton/>
 *      </SearchResultsProvider>
 *    )
 *  }
 * ```
 */
export default function SearchResultsProvider({ store, updateStore, plpService, children }) {
  useEffect(() => {
    if (store.reloading) {
      async function refresh() {
        console.log('refresh here')
        const query = getQueryForState()
        const url = getURLForState(query)

        let filters = []
        if (query.filters) {
          filters = JSON.parse(query.filters)
        }

        console.log(query)

        let by_price_per_net_content = query.by_price_per_net_content
          ? JSON.parse(query.by_price_per_net_content)
          : undefined
        let by_discount = query.by_discount ? JSON.parse(query.by_discount) : undefined

        const res = await plpService(
          filters,
          by_price_per_net_content,
          by_discount,
          query.sort,
          query.page,
          query.q,
        )

        // Don't show page for user
        delete query.page
        replaceState(null, null, getURLForState(query))

        const products = res.data.data
        const total = res.data.total

        updateStore(store => ({
          reloading: false,
          pageData: {
            ...store.pageData,
            total,
            products:
              store.pageData.page === 1 ? products : store.pageData.products.concat(products),
          },
        }))
      }
      refresh()
    }
  }, [store])

  /**
   * Fetches the next page of results
   */
  const fetchMore = () => {
    updateStore(store => ({
      reloading: true,
      pageData: {
        ...store.pageData,
        page: store.pageData.page + 1,
      },
    }))
  }

  /**
   * Removes all filters
   * @param {Boolean} submit If true, fetches new results from the server
   */
  const clearFilters = submit => {
    setFilters([], submit)
    updateStore(store => ({
      reloading: Boolean(submit),
      pageData: {
        ...store.pageData,
        by_discount: undefined,
        by_price_per_net_content: undefined,
      },
    }))
  }

  const setByPricePerNetContentFilterMin = min => {
    updateStore(store => ({
      reloading: Boolean(false),
      pageData: {
        ...store.pageData,
        by_price_per_net_content: {
          ...store.pageData.by_price_per_net_content,
          min,
        },
      },
    }))
  }

  const setByPricePerNetContentFilterMax = max => {
    updateStore(store => ({
      reloading: Boolean(false),
      pageData: {
        ...store.pageData,
        by_price_per_net_content: {
          ...store.pageData.by_price_per_net_content,
          max,
        },
      },
    }))
  }

  const applyByPricePerNetContentFilter = submit => {
    updateStore(store => ({
      reloading: Boolean(submit),
      pageData: {
        ...store.pageData,
        page: submit ? 1 : store.pageData.page,
      },
    }))
  }

  const setByDiscountFilter = (min, max) => {
    updateStore(store => ({
      reloading: Boolean(false),
      pageData: {
        ...store.pageData,
        by_discount: {
          min,
          max,
        },
      },
    }))
  }

  const applyByDiscountFilter = () => {
    updateStore(store => ({
      reloading: Boolean(true),
      pageData: {
        ...store.pageData,
        page: true ? 1 : store.pageData.page,
      },
    }))
  }

  /**
   * Switches the state of a filter
   * @param {Object} facet
   * @param {Boolean} submit If true, fetches new results from the server
   */
  const toggleFilter = (facet, submit) => {
    const { code } = facet
    const { filters } = store.pageData
    const nextFilters = [...filters]
    const index = nextFilters.indexOf(code)

    if (index === -1) {
      nextFilters.push(code)
    } else {
      nextFilters.splice(index, 1)
    }

    setFilters(nextFilters, submit)
  }

  /**
   * Switches the state of a filter
   * @param {Object} facet
   * @param {Boolean} submit If true, fetches new results from the server
   */
  const updateFilters = (facets, submit) => {
    const { filters } = store.pageData
    const nextFilters = [...filters]

    facets.forEach(facet => {
      const { code } = facet
      const index = nextFilters.indexOf(code)
      if (index === -1) {
        nextFilters.push(code)
      } else {
        nextFilters[index] = code
      }
    })

    setFilters(nextFilters, submit)
  }

  /**
   * Updates the set of selected filters
   * @param {Object[]} filters
   * @param {Boolean} submit If true, fetches new results from the server
   */
  const setFilters = (filters, submit) => {
    const filtersChanged =
      JSON.stringify(filters.map(v => v.toLowerCase()).sort()) !==
      JSON.stringify(store.pageData.filters.map(v => v.toLowerCase()).sort())

    updateStore(store => ({
      reloading: Boolean(submit),
      pageData: {
        ...store.pageData,
        filters,
        filtersChanged: submit ? false : filtersChanged,
        page: submit ? 1 : store.pageData.page,
      },
    }))
  }

  /**
   * Applies the selected filters, resets the page to 0 and fetches new results from the server.
   */
  const applyFilters = () => {
    updateStore(store => ({
      reloading: true,
      pageData: {
        ...store.pageData,
        filtersChanged: false,
        page: 1,
      },
    }))
  }

  /**
   * Computes the query for the current state of the search controls
   */
  const getQueryForState = () => {
    const { filters, by_price_per_net_content, by_discount, page, sort, q } = store.pageData
    const { search } = window.location
    const query = qs.parse(search, { ignoreQueryPrefix: true })

    if (by_price_per_net_content) {
      query.by_price_per_net_content = JSON.stringify(by_price_per_net_content)
    } else {
      delete query.by_price_per_net_content
    }

    if (by_discount) {
      query.by_discount = JSON.stringify(by_discount)
    } else {
      delete query.by_discount
    }

    if (filters.length) {
      query.filters = JSON.stringify(filters)
    } else {
      delete query.filters
    }

    if (query.more) {
      delete query.more
    }

    if (page > 1) {
      query.page = page
    } else {
      delete query.page
    }

    if (sort) {
      query.sort = sort
    } else {
      delete query.sort
    }

    if (q) {
      query.q = q
    } else {
      delete query.q
    }

    return query
  }

  /**
   * Computes the URL for the current query of the search controls
   */
  const getURLForState = query => {
    const { pathname, hash } = window.location

    return pathname + qs.stringify(query, { addQueryPrefix: true }) + hash
  }

  const setSort = option => {
    updateStore(store => ({
      reloading: true,
      pageData: {
        ...store.pageData,
        sort: option.code,
        page: 1,
      },
    }))
  }

  return (
    <SearchResultsContext.Provider
      value={{
        ...store,
        actions: {
          fetchMore,
          toggleFilter,
          clearFilters,
          applyFilters,
          setSort,
          setFilters,
          updateFilters,
          applyByPricePerNetContentFilter,
          setByPricePerNetContentFilterMin,
          setByPricePerNetContentFilterMax,
          setByDiscountFilter,
          applyByDiscountFilter,
        },
      }}
    >
      {children}
    </SearchResultsContext.Provider>
  )
}

SearchResultsProvider.propTypes = {
  /**
   * A store returned from [`useSearchResultsStore`](/apiReference/plp/useSearchResultsStore).
   */
  store: PropTypes.object.isRequired,

  /**
   * The update function returned from [`useSearchResultsStore`](/apiReference/plp/useSearchResultsStore).
   */
  updateStore: PropTypes.func.isRequired,
}
