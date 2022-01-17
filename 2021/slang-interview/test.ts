const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const mockedAsyncCallback = jest.fn().mockImplementation(
  async (input: number): Promise<boolean> =>
    new Promise(async (resolve) => {
      await sleep(Math.floor(Math.random() * 1000))
      resolve(true)
    })
)

const wrapRateLimit = async (
  inputs: number[],
  rateLimit: number,
  requestWindowInterval: number,
  callback: (num: number) => Promise<unknown>
): Promise<boolean> => {
  let timestamps: number[] = []

  for (let i = 0; i < inputs.length; i += rateLimit) {
    if (rateLimit <= timestamps.length) {
      const now = new Date().getTime()
      const sleepTime = timestamps[0] + requestWindowInterval - now
      console.log('rate limited!', { sleepTime, timestamps })
      await sleep(sleepTime)
    }

    console.log('running inputs', inputs.slice(i, i + rateLimit))

    await Promise.all(
      inputs.slice(i, i + rateLimit).map((input) =>
        callback(input).then((res) => {
          const now = new Date()
          timestamps.push(now.getTime())
          timestamps = timestamps.filter(
            (ts) => ts > now.getTime() - requestWindowInterval
          )
          console.log({ timestamps })
          return res
        })
      )
    )
  }

  return false
}
jest.setTimeout(1000 * 60 * 60)

describe('Slang Interview: Self Rate Limit', () => {
  it('should respect a low rate limit', async () => {
    const input = [...Array(100).keys()]
    const limit = 2
    const interval = 1000
    await wrapRateLimit(input, limit, interval, mockedAsyncCallback)
    expect(mockedAsyncCallback).toBeCalledTimes(2)
  })
})
