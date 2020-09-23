import * as useLazyState from '@tikoglobal/react-storefront/hooks/useLazyState'
import useSearchResultsStore from '@tikoglobal/react-storefront/plp/useSearchResultsStore'

describe('useSearchResultsStore', () => {
  it('should call useLazyState with right params and return useLazyState result', () => {
    const testObj = {
      test: 'test',
    }

    const lazyStoreSpy = jest.spyOn(useLazyState, 'default').mockReturnValue(true)
    const res = useSearchResultsStore(testObj)

    expect(res).toBe(true)
    expect(lazyStoreSpy.mock.calls[0][0]).toBe(testObj)
  })
})
