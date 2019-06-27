// @flow
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Calculator } from './src/components/Calculator'

type Props = {}
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Calculator />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
})
