// @flow
import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

type Props = {
  total: string,
  current: string,
}
export class CalcScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>= {this.props.total}</Text>
        <Text>{this.props.current}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    backgroundColor: '#F5FCFF',
  },
})
