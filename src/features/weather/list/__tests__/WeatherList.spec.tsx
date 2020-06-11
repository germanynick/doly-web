import * as services from '@services'
import { act, renderHook } from '@testing-library/react-hooks'

import { useWeatherListLogic } from '../WeatherList'

const asyncMockFn = jest.fn().mockResolvedValue('Resolve Value').mockRejectedValue('Reject Value')

describe('Weather List', () => {
  beforeAll(() => {
    services.weatherService.searchByLocation = asyncMockFn
  })

  beforeEach(() => {
    asyncMockFn.mockClear()
  })

  test('Call weatherService only one time on initial step.', () => {
    renderHook(() => useWeatherListLogic({}))
    expect(asyncMockFn).toHaveBeenCalledWith(undefined)
    expect(asyncMockFn).toHaveBeenCalledTimes(1)
  })

  test('Call weatherService when update search value.', () => {
    const { result } = renderHook(() => useWeatherListLogic({}))
    expect(asyncMockFn).toHaveBeenCalledWith(undefined)
    expect(asyncMockFn).toHaveBeenCalledTimes(1)

    const search = 'Hello'
    act(() => result.current.onSearch(search))

    expect(asyncMockFn).toHaveBeenCalledWith(search)
    expect(asyncMockFn).toHaveBeenCalledTimes(2)
  })

  test('Call weatherService when call refetch.', () => {
    const { result } = renderHook(() => useWeatherListLogic({}))
    expect(asyncMockFn).toHaveBeenCalledWith(undefined)
    expect(asyncMockFn).toHaveBeenCalledTimes(1)

    act(() => {
      result.current.refetch()
    })

    expect(asyncMockFn).toHaveBeenCalledWith(undefined)
    expect(asyncMockFn).toHaveBeenCalledTimes(2)
  })

  test('Call weatherService with last params', () => {
    const { result } = renderHook(() => useWeatherListLogic({}))

    act(() => result.current.onSearch('2nd'))
    act(() => {
      result.current.refetch()
    })
    act(() => result.current.onSearch('4rd'))
    act(() => {
      result.current.refetch()
    })

    expect(asyncMockFn).toHaveBeenCalledTimes(5)
    expect(asyncMockFn).toHaveBeenNthCalledWith(2, '2nd')
    expect(asyncMockFn).toHaveBeenNthCalledWith(3, '2nd')
    expect(asyncMockFn).toHaveBeenNthCalledWith(4, '4rd')
    expect(asyncMockFn).toHaveBeenNthCalledWith(5, '4rd')
  })
})
