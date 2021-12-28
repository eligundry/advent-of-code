const rob = (houses: number[]): number => {
  let maxMoney = 0
  let minStep = Math.min(2, houses.length - 1)
  let maxStep = Math.max(houses.length, 3)

  for (let step = minStep; step < maxStep; step++) {
    for (let start = 0; start < houses.length; start++) {
      let run = houses[start]

      for (let i = 0; i < houses.length; i += step) {
        // console.log({ step, start, i, money: houses[i] })
        if (start !== i) {
          run += houses[i]
        }
      }

      maxMoney = Math.max(run, maxMoney)
    }
  }
  }
  return maxMoney
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
