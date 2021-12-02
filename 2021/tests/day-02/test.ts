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

describe('Day 2: Dive!', () => {
  it('should handle the test input', async () => {
    const movements: Movement[] = [
      { direction: 'forward', distance: 5 },
      { direction: 'down', distance: 5 },
      { direction: 'forward', distance: 8 },
      { direction: 'up', distance: 3 },
      { direction: 'down', distance: 8 },
      { direction: 'forward', distance: 2 },
    ]
    expect(dive(movements)).toBe(150)
  })

  it('should find the answer to part 1', async () => {
    const movements = await parseInput()
    const distance = dive(movements)
    console.log(`the answer to part 1 is ${distance}`)
    expect(distance).toBe(1670340)
  })
})
