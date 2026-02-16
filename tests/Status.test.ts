import { describe, it, expect } from 'vitest'
import { getStatusColor } from '../src/Status'

describe('getStatusColor', () => {

    it('returns green for active', () => {
        expect(getStatusColor('active')).toBe('green')
    })

    it('returns gray for inactive', () => {
        expect(getStatusColor('inactive')).toBe('gray')
    })

    it('returns blue for new', () => {
        expect(getStatusColor('new')).toBe('blue')
    })

})
