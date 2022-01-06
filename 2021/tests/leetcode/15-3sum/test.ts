import bigBoy from './big-boy.json'

type Sum = [number, number, number]

function threeSum(nums: number[]): Sum[] {
  const sumMap: Record<string, Sum> = {}

  if (nums.length < 3) {
    return []
  }

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      for (let k = 0; k < nums.length; k++) {
        if (i === j || j === k || i === k) {
          continue
        }

        if (nums[i] + nums[j] + nums[k] === 0) {
          const sum: Sum = [nums[i], nums[j], nums[k]]
          sum.sort((a, b) => a - b)
          sumMap[sum.join(',')] = sum
        }
      }
    }
  }

  return Object.values(sumMap)
}

describe('15. 3Sum', () => {
  test.concurrent.each([
    [
      [-1, 0, 1, 2, -1, -4],
      [
        [-1, -1, 2],
        [-1, 0, 1],
      ],
    ],
    [[], []],
    [[0], []],
  ])('threeSum(%j) === %j', (nums, output) =>
    expect(threeSum(nums)).toEqual(expect.arrayContaining(output))
  )

  it('should handle the big boy', async () => {
    console.log(threeSum(bigBoy))
  })
})
