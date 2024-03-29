import { describe, it, expect } from 'vitest'
import { readInputIntoLines } from './utils'

interface BagContents {
  id: number
  red: number
  green: number
  blue: number
}

const gameIdPattern = /Game (\d+):/
const gamePattern = /((\d+) (red|green|blue))/gi

function calculateGame(gameStr: string): BagContents {
  const contents: BagContents = {
    id: 0,
    red: 0,
    green: 0,
    blue: 0,
  }

  const gameIdMatches = gameStr.match(gameIdPattern)

  if (!gameIdMatches) {
    throw new Error('Invalid game string, line must begin with "Game \\d"')
  }

  contents.id = Number(gameIdMatches[1])

  const contentMatches = gameStr.matchAll(gamePattern)

  for (const match of contentMatches) {
    const color = match[3] as keyof Omit<BagContents, 'id'>
    const amount = Number(match[2])
    contents[color] = Math.max(amount, contents[color])
  }

  return contents
}

describe('calculateGame', () => {
  it('should handle a single a single draw', async () => {
    expect(calculateGame('Game 1: 1 red, 2 green, 3 blue')).toEqual({
      id: 1,
      red: 1,
      green: 2,
      blue: 3,
    })
  })

  it('should handle multiple draws', async () => {
    expect(
      calculateGame('Game 1: 1 red, 2 green, 3 blue; 4 red, 3 green, 3 blue')
    ).toEqual({
      id: 1,
      red: 4,
      green: 3,
      blue: 3,
    })
  })
})

function sumIdsOfValidGames(input: string[]): number {
  let sum = 0

  for (const gameStr of input) {
    const game = calculateGame(gameStr)

    if (game.red <= 12 && game.green <= 13 && game.blue <= 14) {
      sum += game.id
    }
  }

  return sum
}

describe('sumIdsOfValidGames (part 1)', () => {
  it('should handle example input', async () => {
    const input = [
      'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
      'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
      'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
      'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
      'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
    ]
    expect(sumIdsOfValidGames(input)).toBe(8)
  })

  it('should answer part 1', async () => {
    const input = await readInputIntoLines('day-02')
    const answer = sumIdsOfValidGames(input)
    expect(answer).toBe(2439)
  })
})

function powerOfGames(input: string[]) {
  let sum = 0

  for (const gameStr of input) {
    const game = calculateGame(gameStr)
    sum += game.red * game.green * game.blue
  }

  return sum
}

describe('powerOfGames (part 2)', () => {
  it('should handle example 1', async () => {
    expect(
      powerOfGames(['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'])
    ).toBe(48)
  })

  it('should handle full example input', async () => {
    const input = [
      'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
      'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
      'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
      'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
      'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
    ]
    expect(powerOfGames(input)).toBe(2286)
  })

  it('should answer part 2', async () => {
    const input = await readInputIntoLines('day-02')
    const answer = powerOfGames(input)
    expect(answer).toBe(63711)
  })
})
