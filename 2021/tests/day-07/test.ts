import * as path from 'path'
import { readFileByLine } from 'utils'

const parseInput = async () =>
  (await readFileByLine(path.join(__dirname, './input.txt'))).flatMap((line) =>
    line.split(',').map(Number)
  )

const findCheapestPath = (positions: number[]): number => {
  let cheapestRoute = Number.MAX_SAFE_INTEGER

  positions.forEach((startingPoint) => {
    const currentRoute = positions.reduce((acc, currentPoint) => {
      acc += Math.abs(currentPoint - startingPoint)
      return acc
    }, 0)

    cheapestRoute = Math.min(cheapestRoute, currentRoute)
  })

  return cheapestRoute
}

describe('Day 7: The Treachery of Whales', () => {
  const testPositions = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14]

  it('should handle the test input', async () => {
    expect(findCheapestPath(testPositions)).toBe(37)
  })

  it('should find the answer for part 1', async () => {
    const positions = await parseInput()
    const answer = findCheapestPath(positions)
    console.log(`the answer to part 1 is ${answer}`)
    expect(answer).toBe(336701)
  })
})
