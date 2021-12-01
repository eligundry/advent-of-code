import * as path from 'path'
import { readFileByLine } from 'utils'

const parseInput = async () =>
  (await readFileByLine(path.resolve(__dirname, './input.txt'))).map((line) =>
    parseInt(line)
  )

const countDepthIncreases = (depths: number[]) => {
  let increases = 0

  for (let i = 1; i < depths.length; i++) {
    if (depths[i - 1] < depths[i]) {
      increases++
    }
  }

  return increases
}

const countDepthWindowSumIncreases = (depths: number[]) => {
  // First, let's compute all the 3 element windows.
  const windowComputations = []

  for (let i = 0; i < depths.length; i++) {
    windowComputations.push(
      depths[i] + (depths[i + 1] ?? 0) + (depths[i + 2] ?? 0)
    )
  }

  // Now, count the increases in all the combinations
  let increases = 0

  for (let i = 1; i < windowComputations.length; i++) {
    if (windowComputations[i] > windowComputations[i - 1]) {
      increases++
    }
  }

  return increases
}

describe('Day 1: Sonar Sweep', () => {
  it('should handle the test input for part 1', async () => {
    const testInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
    expect(countDepthIncreases(testInput)).toBe(7)
  })

  it('should find the answer for part 1', async () => {
    const part1Input = await parseInput()
    const increases = countDepthIncreases(part1Input)
    console.log(`the answer to part 1 is ${increases}`)
    expect(increases).toBe(1791)
  })

  it('should handle the test input for part 2', async () => {
    const testInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
    expect(countDepthWindowSumIncreases(testInput)).toBe(5)
  })

  it('should find the answer for part 2', async () => {
    const input = await parseInput()
    const increases = countDepthWindowSumIncreases(input)
    console.log(`the answer to part 2 is ${increases}`)
    expect(increases).toBe(1822)
  })
})
