import { inspect } from 'util'

// Stole this from https://leetcode.com/problems/coin-change/discuss/1214071/JavaScript-DP
// Dynamic programming is a mindfuck.
function coinChange(coins: number[], amount: number): number {
  // The approach here is that we will create an array where each index is the
  // range of 0..amount and the values are the number of coins it takes to make
  // that amount.
  const minCoins = new Array(amount + 1).fill(Infinity)
  minCoins[0] = 0

  for (let i = 0; i < coins.length; i++) {
    for (let j = 0; j < minCoins.length; j++) {
      if (coins[i] <= j) {
        minCoins[j] = Math.min(minCoins[j], 1 + minCoins[j - coins[i]])
      }
    }
  }

  // console.log(inspect(minCoins, { maxArrayLength: null }))

  return minCoins[amount] !== Infinity ? minCoins[amount] : -1
}

describe('322. Coin Change', () => {
  test.concurrent.each([
    [[1, 2, 5], 11, 3],
    [[2], 3, -1],
    [[1], 0, 0],
    [[1], 2, 2],
    [[186, 419, 83, 408], 6249, 20],
  ])('coinChange(%j, %d) === %d', (coins, amount, result) =>
    expect(coinChange(coins, amount)).toBe(result)
  )
})
