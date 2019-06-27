// @flow
const BASE = 6

export const convertHeximalToDecimal = (input: string): number => {
  const length = input.length
  if (length === 0) {
    return 0
  }

  const firstDigit = parseInt(input[0])
  let total = firstDigit * BASE

  if (length > 1) {
    for (let index = 1; index < input.length; index++) {
      const nextDigit = parseInt(input[index])
      total += nextDigit
      if (index < length - 1) {
        total *= BASE
      }
    }
  }

  return total
}

export const convertDecimalToHeximal = (input: number): string => {
  if (input === 0) {
    return '0'
  } else {
    let remainder = input % BASE
    return (
      convertDecimalToHeximal(parseInt((input - remainder) / BASE)) +
      remainder.toString()
    )
  }
}
