// @flow
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import CalcButton from './src/components/CalcButton'

type Props = {}
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <CalcButton symbol="0" onPress={() => undefined} />
        <CalcButton symbol="1" onPress={() => undefined} />
        <CalcButton symbol="2" onPress={() => undefined} />
        <CalcButton symbol="3" onPress={() => undefined} />
        <CalcButton symbol="4" onPress={() => undefined} />
        <CalcButton symbol="5" onPress={() => undefined} />
        <CalcButton symbol="+" onPress={() => undefined} />
        <CalcButton symbol="-" onPress={() => undefined} />
        <CalcButton symbol="*" onPress={() => undefined} />
        <CalcButton symbol="/" onPress={() => undefined} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})
