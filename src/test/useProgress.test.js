import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useProgress } from '../hooks/useProgress'

beforeEach(() => {
  localStorage.clear()
})

describe('useProgress', () => {
  it('begint met de pin-screen als er geen opgeslagen voortgang is', () => {
    const { result } = renderHook(() => useProgress())
    expect(result.current.progress.screen).toBe('pin')
    expect(result.current.progress.pinVerified).toBe(false)
    expect(result.current.progress.currentStopIndex).toBe(0)
  })

  it('slaat voortgang op in localStorage na update', () => {
    const { result } = renderHook(() => useProgress())
    act(() => {
      result.current.update({ pinVerified: true, screen: 'welcome' })
    })
    const saved = JSON.parse(localStorage.getItem('llt_progress'))
    expect(saved.pinVerified).toBe(true)
    expect(saved.screen).toBe('welcome')
  })

  it('laadt opgeslagen voortgang bij initialisatie', () => {
    localStorage.setItem('llt_progress', JSON.stringify({
      pinVerified: true,
      screen: 'navigate',
      currentStopIndex: 1,
      wrongAttempts: {},
      finished: false,
    }))
    const { result } = renderHook(() => useProgress())
    expect(result.current.progress.screen).toBe('navigate')
    expect(result.current.progress.currentStopIndex).toBe(1)
  })

  it('reset verwijdert localStorage en keert terug naar beginstaat', () => {
    const { result } = renderHook(() => useProgress())
    act(() => {
      result.current.update({ screen: 'puzzle', currentStopIndex: 2 })
    })
    act(() => {
      result.current.reset()
    })
    expect(result.current.progress.screen).toBe('pin')
    expect(localStorage.getItem('llt_progress')).toBeNull()
  })

  it('houdt wrongAttempts per stop bij', () => {
    const { result } = renderHook(() => useProgress())
    act(() => {
      result.current.update({ wrongAttempts: { 0: 2 } })
    })
    expect(result.current.progress.wrongAttempts[0]).toBe(2)
  })
})
