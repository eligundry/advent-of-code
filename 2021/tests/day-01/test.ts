import * as path from 'path'
import { readFileByLine } from 'utils'

const countDepthIncreases = (depths: number[]) => {
  let increases = 0

  for (let i = 1; i < depths.length; i++) {
    if (depths[i - 1] < depths[i]) {
      increases++
    }
  }

  return increases
}

describe('Day 1', () => {
  it('should handle the test input', async () => {
    const testInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
    expect(countDepthIncreases(testInput)).toBe(7)
  })

  it('should find the answer for part 1', async () => {
    const part1Input = (
      await readFileByLine(path.resolve(__dirname, './input.txt'))
    ).map((line) => parseInt(line))
    const increases = countDepthIncreases(part1Input)
    console.log(`the answer to part 1 is ${increases}`)
    expect(increases).toBe(1791)
  })
})
