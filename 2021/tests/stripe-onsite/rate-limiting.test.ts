type EndpointMethod = 'GET' | 'POST'
type RateLimitCache = Record<string, Partial<Record<EndpointMethod, Date[]>>>

const checkRateLimit = (
  customerID: string,
  method: EndpointMethod,
  cache: RateLimitCache
): boolean => {
  if (!cache[customerID]) {
    cache[customerID] = { [method]: [new Date()] }
    return true
  }

  if (!cache[customerID][method]) {
    cache[customerID][method] = []
  }

  const headWeight = method === 'GET' ? 1 : 2
  const headDate = new Date()
  let weightSum = headWeight

  if (cache[customerID]['POST']) {
    const filteredDates = cache[customerID]['POST'].filter(
      (d) => (headDate.getTime() - d.getTime()) / 1000 < 2
    )
    weightSum += filteredDates.length * 2
  }

  if (cache[customerID]['GET']) {
    const filteredDates = cache[customerID]['GET'].filter(
      (d) => (headDate.getTime() - d.getTime()) / 1000 < 2
    )
    weightSum += filteredDates.length
  }

  if (weightSum < 5) {
    cache[customerID][method].push(new Date())
  }

  return weightSum < 5
}

const executeEndpoint = (
  customerID: string,
  method: EndpointMethod,
  cache: RateLimitCache
): string => {
  if (checkRateLimit(customerID, method, cache)) {
    return `429: Rate limit exceeded`
  }

  return `results for ${customerID}`
}

describe('Stripe Onsite: Rate Limiting', () => {
  it('checkRateLimit: ensure empty success state', async () => {
    const cache: RateLimitCache = {
      customer1: {},
    }
    expect(checkRateLimit('customer1', 'GET', cache)).toBe(true)
    expect(cache.customer1.GET).toHaveLength(1)
  })

  it('checkRateLimit: ensure success state', async () => {
    const cache: RateLimitCache = {
      customer1: { GET: [new Date()] },
    }
    expect(checkRateLimit('customer1', 'GET', cache)).toBe(true)
    expect(cache.customer1.GET).toHaveLength(2)
  })

  it('checkRateLimit: ensure failure state', async () => {
    const now = new Date()
    const cache: RateLimitCache = {
      customer1: { GET: [now, now, now, now, now, now, now] },
    }
    expect(checkRateLimit('customer1', 'GET', cache)).toBe(false)
    expect(cache.customer1.GET).toHaveLength(cache.customer1.GET.length)
  })

  it('checkRateLimit: ensure success state for differing timestamps', async () => {
    const now = new Date()
    const cache: RateLimitCache = {
      customer1: {
        GET: [now, now, now, now, now, now, now].map((d, i) => {
          const newDate = new Date(d.getTime())
          newDate.setSeconds(newDate.getSeconds() - (i + 1) * 3)
          return newDate
        }),
      },
    }
    expect(checkRateLimit('customer1', 'GET', cache)).toBe(true)
    expect(cache.customer1.GET).toHaveLength(cache.customer1.GET.length)
  })

  it('checkRateLimit: ensure weighted failure state', async () => {
    const now = new Date()
    const cache: RateLimitCache = {
      customer1: { POST: [now, now, now] },
    }
    expect(checkRateLimit('customer1', 'POST', cache)).toBe(false)
    expect(cache.customer1.POST).toHaveLength(cache.customer1.POST.length)
  })
})
