import { describe, it, expect } from 'vitest'
import { haversineDistance, calculateBearing, formatDistance } from '../utils/geo'

describe('haversineDistance', () => {
  it('geeft 0 terug voor identieke coördinaten', () => {
    expect(haversineDistance(52.37, 4.89, 52.37, 4.89)).toBe(0)
  })

  it('berekent de afstand tussen Amsterdam en Utrecht (~35 km)', () => {
    const dist = haversineDistance(52.3702, 4.8952, 52.0907, 5.1214)
    expect(dist).toBeGreaterThan(32000)
    expect(dist).toBeLessThan(38000)
  })

  it('berekent een korte afstand van ~20 meter correct', () => {
    // ~20 meter naar het noorden
    const dist = haversineDistance(52.3702, 4.8952, 52.37038, 4.8952)
    expect(dist).toBeGreaterThan(15)
    expect(dist).toBeLessThan(25)
  })
})

describe('calculateBearing', () => {
  it('geeft 0 (noord) terug als het doel recht naar het noorden ligt', () => {
    const bearing = calculateBearing(52.0, 4.9, 53.0, 4.9)
    expect(bearing).toBeCloseTo(0, 0)
  })

  it('geeft ~90 (oost) terug als het doel recht naar het oosten ligt', () => {
    const bearing = calculateBearing(52.0, 4.0, 52.0, 6.0)
    expect(bearing).toBeGreaterThan(85)
    expect(bearing).toBeLessThan(95)
  })

  it('geeft ~180 (zuid) terug als het doel recht naar het zuiden ligt', () => {
    const bearing = calculateBearing(53.0, 4.9, 52.0, 4.9)
    expect(bearing).toBeCloseTo(180, 0)
  })

  it('geeft ~270 (west) terug als het doel recht naar het westen ligt', () => {
    const bearing = calculateBearing(52.0, 6.0, 52.0, 4.0)
    expect(bearing).toBeGreaterThan(265)
    expect(bearing).toBeLessThan(275)
  })

  it('geeft altijd een waarde tussen 0 en 360', () => {
    const cases = [
      [52.0, 4.0, 51.0, 5.0],
      [51.0, 5.0, 52.0, 4.0],
      [52.5, 4.5, 52.5, 4.6],
    ]
    for (const [lat1, lng1, lat2, lng2] of cases) {
      const b = calculateBearing(lat1, lng1, lat2, lng2)
      expect(b).toBeGreaterThanOrEqual(0)
      expect(b).toBeLessThan(360)
    }
  })
})

describe('formatDistance', () => {
  it('toont meters onder de 1000', () => {
    expect(formatDistance(230)).toBe('230 m')
    expect(formatDistance(1)).toBe('1 m')
    expect(formatDistance(999)).toBe('999 m')
  })

  it('toont kilometers vanaf 1000 meter', () => {
    expect(formatDistance(1000)).toBe('1.0 km')
    expect(formatDistance(1500)).toBe('1.5 km')
    expect(formatDistance(10000)).toBe('10.0 km')
  })

  it('rondt meters af op gehele getallen', () => {
    expect(formatDistance(19.7)).toBe('20 m')
    expect(formatDistance(19.2)).toBe('19 m')
  })
})
