import * as path from 'path'
import { readFileByLine } from 'utils'

const parseInput = async (): Promise<number[]> =>
  (await readFileByLine(path.resolve(__dirname, './input.txt'))).map(
    (line): number => parseInt(line)
  )

const findBrokenNumber = (
  numbers: number[],
  preamble: number
): number | undefined => {
  if (preamble > numbers.length) {
    throw new Error('preamble cannot be more than the input')
  }

  // The "correct" way to solve this is to compute all the combinations in the
  // window. I'm too lazy to do that so I'll just leave this nast loop based one
  // for now.
  // pi = preambleIndex
  for (let pi = preamble; pi <= numbers.length; pi++) {
    let foundMatch = false

    for (let i = pi - preamble; i < pi; i++) {
      for (let j = pi - preamble; j < pi; j++) {
        if (i === j) {
          continue
        }

        if (numbers[i] + numbers[j] === numbers[pi]) {
          // console.log(`found ${numbers[i]} + ${numbers[j]} === ${numbers[pi]}`)
          foundMatch = true
          break
        }
      }

      if (foundMatch) {
        break
      }
    }

    if (!foundMatch) {
      return numbers[pi]
    }
  }

  return undefined
}

describe('Day 0: Encoding Error', () => {
  it('should detect 26 as a valid number', async () => {
    const input = [...Array(25).keys()].map((i) => i + 1)
    expect(findBrokenNumber(input, 25)).toBeUndefined()
  })

  it('should fail on the test input', async () => {
    const input = [
      35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299,
      277, 309, 576,
    ]
    expect(findBrokenNumber(input, 5)).toBe(127)
  })

  it('should find the first answer', async () => {
    const input = await parseInput()
    const answer = findBrokenNumber(input, 25)
    console.log(`the answer to part 1 is: ${answer}`)
    expect(answer).toBe(1212510616)
  })
})
