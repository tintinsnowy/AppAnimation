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
  this.spinValue = new Animated.Value(0)
}
   componentDidMount () {
  this.spin()
}
    
spin () {
  this.spinValue.setValue(0)
  Animated.timing(
    this.spinValue,
    {
      toValue: 1,
      duration: 400,  // change the the value from 0 to 1 in 400mm
      easing: Easing.lineary
    }
  ).start(() => this.spin())
} 
    
    render () {
  const spin = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  return (
    <View style={styles.container}>
      <Animated.Image
        style={{
          width: 227,
          height: 200,
          transform: [{rotate: spin}] }}
          source={{uri: 'http://d2trtkcohkrm90.cloudfront.net/images/emoji/apple/ios-10/256/pear.png'}}
      />
    </View>
  )
}
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});