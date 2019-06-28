// @flow
import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { COLORS, SIZES } from '../styles'

type Props = {
  value: string,
}
export class CalcScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.screenText}>{this.props.value}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: COLORS.screenBackground,
    padding: SIZES.commonSpacing * 2,
    margin: SIZES.commonSpacing,
    borderRadius: SIZES.commonRadius,
  },
  screenText: {
    fontSize: SIZES.fontSize * 1.6,
    color: COLORS.buttonText,
  }
})
