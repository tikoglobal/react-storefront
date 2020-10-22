import useLazyState from '../hooks/useLazyState'

/**
 * Allows for using search results.
 * @param lazyProps
 * @return {*[]}
 */
export default function useSearchResultsStore(lazyProps) {
  const additionalData = {
    reloading: false,
    pageData: Object.freeze({
      page: 1,
      filters: [],
      sort: 'discount_desc',
      sortSaved: 'discount_desc',
      sortOptions: [],
      filtersChanged: false,
      by_price_per_net_content: undefined,
      by_discount: undefined,
    }),
  }

  return useLazyState(lazyProps, additionalData)
}
