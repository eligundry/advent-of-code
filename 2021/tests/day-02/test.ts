import * as path from 'path'
import { readFileByLine } from 'utils'

const parseInput = async (): Promise<Movement[]> =>
  (await readFileByLine(path.resolve(__dirname, './input.txt'))).map((line) => {
    const [direction, distance] = line.split(' ')
    return {
      direction,
      distance: parseInt(distance),
    } as Movement
  })

interface Movement {
  direction: 'forward' | 'down' | 'up'
  distance: number
}

const dive = (movements: Movement[]): number => {
  let horizontal = 0
  let depth = 0

  movements.forEach((movement) => {
    switch (movement.direction) {
      case 'forward':
        horizontal += movement.distance
        break
      case 'down':
        depth += movement.distance
        break
      case 'up':
        depth -= movement.distance
        break
    }
  })

  return horizontal * depth
}

const diveWithAim = (movements: Movement[]): number => {
  let horizontal = 0
  let depth = 0
  let aim = 0

  movements.forEach((movement) => {
    switch (movement.direction) {
      case 'forward':
        horizontal += movement.distance
        depth += aim * movement.distance
        break
      case 'down':
        aim += movement.distance
        break
      case 'up':
        aim -= movement.distance
        break
    }
  })

  return horizontal * depth
}

describe('Day 2: Dive!', () => {
  const testMovements: Movement[] = [
    { direction: 'forward', distance: 5 },
    { direction: 'down', distance: 5 },
    { direction: 'forward', distance: 8 },
    { direction: 'up', distance: 3 },
    { direction: 'down', distance: 8 },
    { direction: 'forward', distance: 2 },
  ]

  it('should handle the test input for part 1', async () => {
    expect(dive(testMovements)).toBe(150)
  })

  it('should find the answer to part 1', async () => {
    const movements = await parseInput()
    const distance = dive(movements)
    console.log(`the answer to part 1 is ${distance}`)
    expect(distance).toBe(1670340)
  })

  it('should handle the test input for part 2', async () => {
    expect(diveWithAim(testMovements)).toBe(900)
  })

  it('should fine the answer for part 2', async () => {
    const movements = await parseInput()
    const distance = diveWithAim(movements)
    console.log(`the answer to parth 2 is ${distance}`)
    expect(distance).toBe(1954293920)
  })
})
