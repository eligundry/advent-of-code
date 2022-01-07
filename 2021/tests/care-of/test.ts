/*
  Given a file containing order line items in the form [User ID]: [Supplements] where supplements are separated by commas, determine the pairs of supplements that appear most frequently together.

  For example:
  
  Given two line items

  Astaxanthin, CoQ10, Vitamin B12
  Astaxanthin, CoQ10, Vitamin D

  The function should output the pair Astaxanthin, CoQ10.
*/

const userSupplements = [
  'd221dc55-8339-4656-a34f-38524f47198b: Vitamin B12, CoQ10',
  '5fd8175f-a31c-48a2-9eb3-75b1b5fea7d5: Astaxanthin, Fish Oil',
  'fde98c46-788a-40df-86fc-00230d0ba932: Milk Thistle, Bacopa, Zinc',
  '15f1c67f-be72-4aab-9017-a1b2f1ee02b0: Vitamin D',
  'f5ff2aed-8b4b-4f1d-9f76-07f1fa064f08: Kanna',
  '247d4229-c84a-4d7a-ab34-5942035eeb87: Fish Oil, Vitamin C, Astaxanthin',
  'bfdd6170-11d1-47b9-8afc-1f27088b1bb2: Digestive Enzymes, Turmeric, Vitamin B12',
  '8c0c0d29-05eb-4a74-8dad-91db34557653: Bacopa',
  '302157ab-c617-468e-bbfe-ec22f0dfbc04: Fish Oil, Milk Thistle, Vitamin B12',
  '96ba3867-3500-4cbd-aef4-364f833d59ee: Elderberry, Vitamin D',
  '2a03335c-c90d-42b7-9a1e-124417a622a8: Elderberry, Milk Thistle, Turmeric',
  'df95d102-f209-4709-a3fc-0c3536c31ad9: Magnesium, Astaxanthin, Bacopa',
  '8f5f64bb-c017-437f-912b-27e7f06e812a: Rhodiola',
  'b5b86823-c9ab-4e0c-8beb-a8e9c6c7e869: Elderberry, Fish Oil',
  '81274481-4ef9-4842-8cd2-6b238788b0c8: Bacopa, B-Complex',
  '13f2c852-a8ad-406b-8d3e-722ec985b3dd: Vitamin B12',
  '6ba197ae-2f45-4953-819e-83ddf0072d62: Fish Oil, Vitamin D',
  'e6d81dba-5705-4540-be47-1a970145ab31: Magnesium, Milk Thistle, Saw Palmetto',
  'a7340d49-58dc-482d-a012-e38f8f365c8c: Astaxanthin, Rhodiola, Fish Oil',
  '7d688c7c-cb39-4667-82bd-4d732033e5dc: Rhodiola, Vitamin D',
  'c0b8eb59-3af2-4502-a321-538de2a1a5bf: Magnesium',
  '0e30def3-05c0-4699-8906-1317610984df: Saw Palmetto',
  '83fabf17-d36a-4192-a415-2e9de2591ebf: Iron, Fish Oil, Vitamin D',
]

const sort = (a: string, b: string) => {
  if (a > b) {
    return 1
  }

  if (a < b) {
    return -1
  }

  return 0
}

function commonSupplements(userSupplements: string[]) {
  const pairings: Record<string, number> = {}

  for (const supplementItem of userSupplements) {
    const [, rawSupplements] = supplementItem.split(': ')
    const supplements = rawSupplements.split(', ')

    for (let i = 0; i < supplements.length; i++) {
      for (let j = 0; j < supplements.length; j++) {
        if (i === j) {
          continue
        }

        const key = [supplements[i], supplements[j]].sort(sort).join(',')

        if (pairings[key]) {
          pairings[key]++
        } else {
          pairings[key] = 1
        }
      }
    }
  }

  let maxSupplement = ''
  let maxCount = 0

  Object.entries(pairings).forEach(([supplement, count]) => {
    if (count > maxCount) {
      maxSupplement = supplement
      maxCount = count
    }
  })

  return maxSupplement.split(',')
}

describe('commonSupplements', function () {
  it('returns the most common pair of supplements', function () {
    expect(commonSupplements(userSupplements)).toEqual([
      'Astaxanthin',
      'Fish Oil',
    ])
  })
})
