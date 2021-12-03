import * as path from 'path'
import { readFileByLine } from 'utils'

const binaryDiagnostic = (binaryLines: string[]): number => {
  // First we must find the most/least common bits in all the lines
  // @TODO There are bitwise ways of doing this that are probably faster and
  // don't require 2 strings.
  let mostCommonBits = ''
  let leastCommonBits = ''

  for (let i = 0; i < binaryLines[0].length; i++) {
    const count = [0, 0]
    binaryLines.forEach((line) => count[parseInt(line[i])]++)
    mostCommonBits += (+(count[0] < count[1])).toString()
    leastCommonBits += mostCommonBits[i] === '0' ? '1' : '0'
  }

  // Convert binary strings to ints and multiply
  return parseInt(mostCommonBits, 2) * parseInt(leastCommonBits, 2)
}

describe('Day 3: Binary Diagnostic', () => {
  it('should handle the test input', async () => {
    const input = [
      '00100',
      '11110',
      '10110',
      '10111',
      '10101',
      '01111',
      '00111',
      '11100',
      '10000',
      '11001',
      '00010',
      '01010',
    ]
    expect(binaryDiagnostic(input)).toBe(198)
  })

  it('should find the answer for part 1', async () => {
    const input = await readFileByLine(path.join(__dirname, './input.txt'))
    const answer = binaryDiagnostic(input)
    console.log(`the answer for part 1 is ${answer}`)
    expect(answer).toBe(2648450)
  })
})
