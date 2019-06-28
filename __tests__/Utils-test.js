import { convertDecimalToHeximal, convertHeximalToDecimal } from '../src/utils'

const heximal_6 = '10'
const heximal_negative_6 = '-10'

it('converts a positive heximal number to decimal', () => {
  expect(convertHeximalToDecimal(heximal_6)).toBe(6)
})

it('converts a negative heximal number to decimal', () => {
  expect(convertHeximalToDecimal(heximal_negative_6)).toBe(-6)
})

it('converts a positive decimal number to heximal', () => {
  expect(convertDecimalToHeximal(6)).toBe(heximal_6)
})

it('converts a negative decimal number to heximal', () => {
  expect(convertDecimalToHeximal(-6)).toBe(heximal_negative_6)
})

it('works when integrated together', () => {
  for (let index = -10; index <= 10; index++) {
    const heximal = convertDecimalToHeximal(index)
    const integrated = convertHeximalToDecimal(heximal)
    expect(integrated).toBe(index)
  }
})

