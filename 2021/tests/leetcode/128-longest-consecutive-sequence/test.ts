function longestConsecutive(nums: number[]): number {
  nums.sort((a, b) => a - b)
  let numSet = new Set(nums)
  let longestSequence = numSet.size ? 1 : 0
  let currentSequence = 1
  let previousNum: number | undefined = undefined

  for (const currentNum of numSet.values()) {
    if (previousNum === undefined) {
      previousNum = currentNum
      continue
    }

    if (previousNum + 1 === currentNum) {
      longestSequence = Math.max(++currentSequence, longestSequence)
    } else {
      currentSequence = 1
    }

    previousNum = currentNum
  }

  return longestSequence
}

describe('128: Longest Consecutive Sequence', () => {
  test.each([
    [[100, 4, 200, 1, 3, 2], 4],
    [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1], 9],
    [[], 0],
    [[0], 1],
    [[1, 2, 0, 1], 3],
  ])('longestConsecutive(%s) === %d', (input, result) =>
    expect(longestConsecutive(input)).toBe(result)
  )
})
