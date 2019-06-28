// @flow
import React, { Component } from 'react'
import { StyleSheet, View, SafeAreaView, Dimensions } from 'react-native'
import { Calculator } from './src/components/Calculator'
import { COLORS } from './src/styles'

type Props = {}
type State = {
  isPortrait: boolean,
}
export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const { height, width } = Dimensions.get('window')
    this.state = {
      isPortrait: height > width
    }
    // We want to constantly watch for dimension changes because a few styles will be based on orientation
    Dimensions.addEventListener('change', this.handleDimensionChange)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleDimensionChange)
  }

  handleDimensionChange = ({ window }: { window: { height: number, width: number } }) => {
    const { height, width } = window
    const isPortrait = height > width
    this.setState(() => ({
      isPortrait,
    }))
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Calculator isPortrait={this.state.isPortrait} />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.mainBackground,
  },
})
