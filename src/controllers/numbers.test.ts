import { sum } from './numbers'

describe('numbers test', () => {
  it('should be equal', () => {
    expect(sum(5, 10)).toBe(15)
  })
})
