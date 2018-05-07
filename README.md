# Lottie Animation View for React ([Angular](https://github.com/chenqingspring/ng-lottie), [Vue](https://github.com/chenqingspring/vue-lottie))

[![npm version](https://badge.fury.io/js/react-lottie.svg)](http://badge.fury.io/js/react-lottie)

## Demo
https://chenqingspring.github.io/react-lottie

## Wapper of bodymovin.js

[bodymovin](https://github.com/bodymovin/bodymovin) is [Adobe After Effects](http://www.adobe.com/products/aftereffects.html) plugin for exporting animations as JSON, also it provide bodymovin.js for render them as svg/canvas/html.

## Why Lottie?

#### Flexible After Effects features
We currently support solids, shape layers, masks, alpha mattes, trim paths, and dash patterns. And we’ll be adding new features on a regular basis.

#### Manipulate your animation any way you like
You can go forward, backward, and most importantly you can program your animation to respond to any interaction.

#### Small file sizes
Bundle vector animations within your app without having to worry about multiple dimensions or large file sizes. Alternatively, you can decouple animation files from your app’s code entirely by loading them from a JSON API.

[Learn more](http://airbnb.design/introducing-lottie/) › http://airbnb.design/lottie/

Looking for lottie files › https://www.lottiefiles.com/

## Installation

```
npm install --save react-lottie
```
or
```
yarn add react-lottie
```

## Usage

```javascript
import React from 'react'
import Lottie from 'react-lottie';
import * as animationData from './data.json'

export default () => <Lottie animationData={pinJump} />
```

Download example `data.json` file from [Lottie Files](https://www.lottiefiles.com/collections)

#### View Storybook Examples for Additional Usage

Storybook demo files are located in [stories](https://github.com/chenqingspring/react-lottie/blob/master/stories) directory.


## Props
The `<Lottie />` Component supports the following properties:


Property | Type | Default value | Description
:--- | :--- | :--- | :--- | :---
**animationData**|object||An Object with the exported animation data
isStopped|bool|`false`|Controls stopped behavior of Lottie instance
isPaused|bool|`false`|Controls paused behavior of Lottie instance [playSegments(segments, force)](https://github.com/airbnb/lottie-web#playsegmentssegments-forceflag)
forceSegments|bool||Indicates `force` parameter value of [playSegments(segments, force)](https://github.com/airbnb/lottie-web#playsegmentssegments-forceflag) when using segments
loop|union|`false*`|Indicates if animation is looping, defaults to lottie default of `false`
speed|number|1|Controls speed of animation playback through [setSpeed(speed)](https://github.com/airbnb/lottie-web#setspeedspeed)
direction|number||Controls direction of animation playback through [setDirection(direction)](https://github.com/airbnb/lottie-web#setdirectiondirection)
eventListeners|arrayOf||Registers [event](https://github.com/airbnb/lottie-web#events) callbacks with Lottie instance.
clickToPause|bool|`false`|Enables clicking on animation to toggle play/pause
height|union||Shorthand for setting `style.height`
width|union||Shorthand for setting `style.width`
className|string||Sets `className` property of container div
style|object||Sets inline style of container div
ariaRole|string||Sets **aria** `role` of container div
ariaLabel|string||Sets **aria** `aria-label` of container div
title|string||Sets **aria** `title` of container div
innerRef|func||Callback to receive reference to container div node
animationRef|func||Callback to receive reference to Lottie animation instance
onComplete|func||Direct event callback for `complete` [event](https://github.com/airbnb/lottie-web#events)
onLoopComplete|func||Direct event callback for `loopComplete` [event](https://github.com/airbnb/lottie-web#events)
onEnterFrame|func||Direct event callback for `enterFrame` [event](https://github.com/airbnb/lottie-web#events)
onSegmentStart|func||Direct event callback for `segmentStart` [event](https://github.com/airbnb/lottie-web#events)
`***`|any||All other properties are proxied to [lottie.loadAnimation(options)](https://github.com/airbnb/lottie-web#other-loading-options)
> `false*` default is `undefined` but lottie-web default is `false`
-----

## Migrating from v1 => v2
Version 2 takes the opinion that `react-lottie` should match the default
functionality of `lottie-web` as much as possible. Any additional functionality provided
by `react-lottie` is therefore *disabled* by default, such as *click to pause*.

For reconciliation performance the `options` property has been remove in favor of
explicitly defining each property on the component directly, allowing for usage of
[React.PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent).

- `options` property has been removed, directly set all options on the component
	> `<Lottie options={{animationData: myAnimData, loop: true }} />`
	> to
	> `<Lottie animationData={myAnimData} loop={true} />`

- `loop` property is defaulted to `undefined` to take on lottie-web default of `false`
	> `<Lottie animationData={myAnimData} />`
	> to
	> `<Lottie animationData={myAnimData} loop={true} />`

- If you use `isClickToPauseDisabled` functionality, this has disabled by default
and changed to `clickToPause` property
	> `<Lottie animationData={myAnimData} isClickToPauseDisabled={true} />`
	> to
	> `<Lottie animationData={myAnimData} />`

	> `<Lottie animationData={myAnimData} />`
	> to
	> `<Lottie animationData={myAnimData} clickToPause={false} />`

	> `<Lottie animationData={myAnimData} isClickToPauseDisabled={false} />`
	> to
	> `<Lottie animationData={myAnimData} clickToPause={true} />`


## Related Projects

* [Bodymovin](https://github.com/bodymovin/bodymovin) react-lottie is a wrapper of bodymovin
* [Angular Lottie](https://github.com/chenqingspring/ng-lottie) angular implementation
* [Vue Lottie](https://github.com/chenqingspring/vue-lottie) vue implementation
* [React Native Lottie](https://github.com/airbnb/lottie-react-native) react native implementation by airbnb
* [IOS Lottie](https://github.com/airbnb/lottie-ios) ios implementation by airbnb
* [Android Lottie](https://github.com/airbnb/lottie-android) android implementation by airbnb

## Contribution
Your contributions and suggestions are heartily welcome.

## License
MIT
