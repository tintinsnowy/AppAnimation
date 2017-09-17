import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Animated,
	Easing,
	Image
} from 'react-native';

export default class App extends React.Component {
	// generate the item
	constructor(props) {
		super(props);
		// ilitialize
		this.state = {
			fadeOutLog: new Animated.Value(0),
		};
	}

	render() {
		return (
			<Animated.View                         // 可选的基本组件类型: Image, Text, View(可以包裹任意子View)
				style={{
		          flex: 1,
		          alignItems: 'center',
		          justifyContent: 'center',
		          opacity: this.state.fadeOutLog, // 透明度
		        }}>
			    <Image
				    source={{uri: 'http://d2trtkcohkrm90.cloudfront.net/images/emoji/apple/ios-10/256/pear.png'}}
					style={{width: 200, height: 200}}
			    />
			</Animated.View>
	);
	}

	startAnimation(){
		this.state.fadeOutLog.setValue(1);

		
        Animated.timing(
            this.state.fadeOutLog,
            {
                toValue: 0,
                duration: 10000,//10s
                easing: Easing.linear, // 线性的渐变函数
            }
        ).start(); // no cricle

	}

	componentDidMount() {
		this.startAnimation();
	}
}

AppRegistry.registerComponent('App', () => App);