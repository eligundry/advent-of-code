// I had a terrible solution that had nested for loops.
// const rob = (houses: number[]): number => {
//   let maxMoney = 0
//   let maxStep = Math.max(houses.length, 3)
//
//   for (let step = 2; step < maxStep; step++) {
//     for (let start = 0; start < houses.length; start++) {
//       let run = 0
//
//       for (let i = 0; i < houses.length; i += step) {
//         run += houses[i]
//       }
//
//       maxMoney = Math.max(run, maxMoney)
//     }
//   }
//
//   return maxMoney
// }

// The answer is much easier though. I think I understand this?
const rob = (houses: number[]): number => {
  let previous = 0
  let beforePrevious = 0

  for (let i = 0; i < houses.length; i++) {
    let tmp = previous
    previous = Math.max(houses[i] + beforePrevious, previous)
    beforePrevious = tmp
  }

  return previous
}

describe('198: House Robber', () => {
  test.concurrent.each([
    [[1, 2, 3, 1], 4],
    [[2, 7, 9, 3, 1], 12],
    [[2, 1, 1, 2], 4],
    [[1], 1],
    [[0], 0],
    [[1, 2], 2],
  ])('rob(%j) === %d', (houses, result) => expect(rob(houses)).toBe(result))
})
