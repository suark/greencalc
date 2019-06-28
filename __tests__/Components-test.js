import 'react-native'
import React from 'react'
import { CalcScreen } from '../src/components/CalcScreen'
import { CalcButton } from '../src/components/CalcButton'
import { Calculator } from '../src/components/Calculator'
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('Calculator screen renders correctly', () => {
  renderer.create(<CalcScreen value={'123'} />)
})

it('Calculator button renders correctly', () => {
  renderer.create(
    <CalcButton
      symbol={'+'}
      onPress={(input) => console.log(input)}
      isPortrait
    />
  )
})

it('Whole calculator renders correctly', () => {
  renderer.create(<Calculator isPortrait />)
})
