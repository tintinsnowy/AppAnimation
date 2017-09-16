import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Easing
} from 'react-native'

export default class App extends React.Component {
  constructor () {
  super()
  this.state= {
   spinValue: new Animated.Value(0),
   posValue: new Animated.ValueXY()
  }
}
   componentDidMount () {
  this.spin()
}
    
spin () {
  this.state.spinValue.setValue(0)
  Animated.timing(
    this.state.spinValue,
    {
      toValue: 1,
      duration: 500,  // change the the value from 0 to 1 in 400mm
      easing: Easing.lineary
    },
    this.state.posValue,                      // The value to drive
    {
      toValue: {x:20,y:40},                             // Animate to final value of 1
    }
  ).start()//.start(() => this.spin())
} 
    
    render () {
  const spin = this.state.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  return (
    <View style={styles.container}>
      <Animated.Image // warning!! maybe use Animated View
        style={{
          width: 32,
          height: 32,
          transform: [{rotate: spin}] }}
          source={{uri: 'http://d2trtkcohkrm90.cloudfront.net/images/emoji/apple/ios-10/256/red-apple.png'}}
      />
    </View>
  )
}
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left:    30,
    top:    40,
  }
});