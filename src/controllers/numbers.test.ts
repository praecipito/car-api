import { sum } from './numbers'

describe('numbers test', () => {
  it('should be equal', () => {
    expect(sum(5, 5)).toBe(15)
  })
})
