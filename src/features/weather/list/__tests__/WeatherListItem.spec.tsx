import { useState } from 'react'

import * as services from '@services'
import { act, renderHook } from '@testing-library/react-hooks'

import { useWeatherListItemLogic } from '../WeatherListItem'

const asyncMockFn = jest.fn().mockResolvedValue('Resolve Value').mockRejectedValue('Reject Value')

describe('Weather List Item', () => {
  beforeAll(() => {
    services.weatherService.weatherByLocation = asyncMockFn
  })

  beforeEach(() => {
    asyncMockFn.mockClear()
  })

  test('Call weatherService only one time on initial step.', () => {
    renderHook(() => useWeatherListItemLogic({ woeid: 111, title: 'Title' }))
    expect(asyncMockFn).toHaveBeenCalledWith(111)
    expect(asyncMockFn).toHaveBeenCalledTimes(1)
  })

  test('Should return title', () => {
    const { result } = renderHook(() => useWeatherListItemLogic({ woeid: 111, title: 'Title' }))
    expect(result.current.title).toBe('Title')
  })

  test('Call weatherService when woeid changed', () => {
    const { result } = renderHook(() => {
      const [woeid, updateWoeid] = useState(1)
      const data = useWeatherListItemLogic({ woeid, title: 'Title' })

      return {
        updateWoeid,
        ...data,
      }
    })

    act(() => result.current.updateWoeid(111))

    expect(asyncMockFn).toHaveBeenCalledTimes(2)
    expect(asyncMockFn).toHaveBeenNthCalledWith(1, 1)
    expect(asyncMockFn).toHaveBeenNthCalledWith(2, 111)
  })

  test('always return 6 items.', () => {
    const { result } = renderHook(() => useWeatherListItemLogic({ woeid: 111, title: 'Title' }))

    expect(result.current.items).not.toBeUndefined()
    expect(result.current.items.length).toBe(6)
  })
})
