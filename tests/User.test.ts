import { describe, it, expect } from 'vitest'
import { createUser } from '../src/User'

describe('createUser', () => {
    it('creates user with default isActive = true', () => {
        const user = createUser(1, 'Alice')

        expect(user.isActive).toBe(true)
    })

    it('creates user with provided isActive', () => {
        const user = createUser(2, 'Bob', undefined, false)

        expect(user.isActive).toBe(false)
    })
})