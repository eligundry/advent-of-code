import { describe, it, expect } from 'vitest'
import { readInputIntoLines } from './utils'

function countNumberOfMatchesOnCard(line: string): number {
  const groups =
    /^Card[ ]+\d+: (?<winningNumbersStr>[\d ]+) \| (?<heldNumbersStr>[\d ]+)/gi.exec(
      line
    )?.groups

  if (!groups) {
    throw new Error('Invalid line')
  }

  const winningNumbers = groups.winningNumbersStr
    .split(' ')
    .filter(Boolean)
    .map(Number)
  const heldNumbers = groups.heldNumbersStr
    .split(' ')
    .filter(Boolean)
    .map(Number)
  const intersection = winningNumbers.filter((value) =>
    heldNumbers.includes(value)
  )

  return intersection.length
}

describe('countNumberOfMatchesOnCard', () => {
  it('should handle the first example line', () => {
    expect(
      countNumberOfMatchesOnCard(
        'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'
      )
    ).toBe(4)
  })
})

function calculateValueOfCard(line: string): number {
  const matches = countNumberOfMatchesOnCard(line)

  return matches === 0 ? 0 : Math.pow(2, matches - 1)
}

describe('calculateValueOfCard', () => {
  it('should handle the first example line', () => {
    expect(
      calculateValueOfCard('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53')
    ).toBe(8)
  })

  it('should handle a line with no matches', () => {
    expect(
      calculateValueOfCard('Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11')
    ).toBe(0)
  })
})

function calculateValueOfCards(lines: string[]): number {
  return lines.reduce((acc, line) => {
    return acc + calculateValueOfCard(line)
  }, 0)
}

describe('calculateValueOfCards (part 1)', () => {
  it('should handle the example input', () => {
    const input = [
      'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
      'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
      'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
      'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
      'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36',
      'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11',
    ]
    expect(calculateValueOfCards(input)).toBe(13)
  })

  it('should get the answer for part 1', async () => {
    const input = await readInputIntoLines('day-04')
    const answer = calculateValueOfCards(input)
    expect(answer).toBe(27845)
  })
})
