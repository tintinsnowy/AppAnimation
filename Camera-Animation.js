import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Animated,
	Easing,
	Image
} from 'react-native';

export default class App extends React.Component {
	// 构造
	constructor(props) {
		super(props);
		// 初始状态
		this.state = {
			bounceValue: new Animated.Value(0),
			rotateValue: new Animated.Value(0),
			translateValue: new Animated.ValueXY({x:0, y:0}), // 二维坐标
			fadeOutOpacity: new Animated.Value(0),
		};
	}

	render() {
		return (
			<Animated.View                         // 可选的基本组件类型: Image, Text, View(可以包裹任意子View)
				style={{
		          flex: 1,
		          alignItems: 'center',
		          justifyContent: 'center',
		          transform: [  
		            {scale: this.state.bounceValue},  // 缩放
		            {rotate: this.state.rotateValue.interpolate({ // 旋转，使用插值函数做值映射
		                    inputRange: [0, 1],
		                    outputRange: ['0deg', '360deg'],
		                })
		            },
		            {translateX: this.state.translateValue.x}, // x轴移动
		            {translateY: this.state.translateValue.y}, // y轴移动
		          ],
		          opacity: this.state.fadeOutOpacity, // 透明度
		        }}>
			    <Image
				    source={{uri: 'http://d2trtkcohkrm90.cloudfront.net/images/emoji/apple/ios-10/256/pear.png'}}
					style={{width: 200, height: 200}}
			    />
			</Animated.View>
	);
	}

	startAnimation(){
		this.state.bounceValue.setValue(1.5);     // 设置一个较大的初始值
		this.state.rotateValue.setValue(0);
		this.state.translateValue.setValue({x:10, y:10});
		this.state.fadeOutOpacity.setValue(1);

		Animated.sequence(
			[
				Animated.sequence([  //  group parallel（parallel）、sequence（顺序执行）、stagger（错峰，其实就是插入了delay的parrllel）和delay（延迟）
					Animated.spring( //  the 
						this.state.bounceValue,
						{
							toValue: 0.8,
							friction: 1, // defaut:7.
							tension: 40, //maximal
						}
					),
					Animated.delay(1000), // 配合sequence，延迟2秒
					Animated.timing( // 从时间范围映射到渐变的值。
						this.state.rotateValue,
						{
							toValue: 1,
							duration: 400, // defaut 500ms
							easing: Easing.out(Easing.quad), // 一个用于定义曲线的渐变函数
							delay: 0, // 在一段时间之后开始动画（单位是毫秒），默认为0。
						}
					),
					Animated.decay( //  S=vt-（at^2）/2   v=v - at
						this.state.translateValue,
						{
							velocity:50, // 起始速度，必填参数。
							deceleration: 0.8, // 速度衰减比例，默认为0.997。
						}
					),

				]),
				Animated.timing(
					this.state.fadeOutOpacity,
					{
						toValue: 0,
						duration: 2000,
						easing: Easing.linear, // 线性的渐变函数
					}
				),
			]
		).start(); // no cricle

		// 监听值的变化
		this.state.rotateValue.addListener((state) => {
			console.log("rotateValue=>" + state.value);
		});

		// ValueXY
		this.state.translateValue.addListener((value) => {
			console.log("translateValue=>x:" + value.x + " y:" + value.y);
		});

		this.state.fadeOutOpacity.addListener((state) => {
			console.log("fadeOutOpacity=>" + state.value);
		});
	}

	componentDidMount() {
		this.startAnimation();
	}
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('App', () => App);