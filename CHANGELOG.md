# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.0.0"></a>
# [2.0.0](https://github.com/chenqingspring/react-lottie/compare/v1.1.0...v2.0.0) (2018-05-07)


### Features

* **componentDidMount:** enable `assetsPath` option ([7eef671](https://github.com/chenqingspring/react-lottie/commit/7eef671))
* major refactor to act as proxy to lottie, support additional features and resolve issues ([3f1134f](https://github.com/chenqingspring/react-lottie/commit/3f1134f))
* upgrade React@16 Storybook@3 Mocha=>Jest ([62dd31b](https://github.com/chenqingspring/react-lottie/commit/62dd31b))


### BREAKING CHANGES

* Changing api to better align with lottie-web funcationality and defaults, as well as updating to new React api/standards.
* - change `isClickToPauseDisabled` to `clickToPause`, reversing the effect making click to pause functionality opt-in
- removed `options` property in favor of explicit *controlled* properties (`animationData`, `loop`, `segments`) and any non-propTypes property being proxied as option to `lottie.loadAnimation(options)`
- segments are initially played if defined; although expected behaivor this was not the case before
- `loop` property is defaulted to `undefined` to take on lottie-web default of `false`

Changed:
- Use React 16 component lifecycle api
- Proxy all additional props to `lottie.loadAnimation(options)` to support additional lottie-web functionality
- Fix issue where segments played two times
- Added `forceSegments` prop to support `force` functionality of `lottie.playSegments(segments, force)`
- Updated `loop` prop to support `number` type
- Added `innerRef` prop to return inner reference to container div
- Added `animationRef` prop to return reference to lottie animation instance
- Added `onComplete`, `onLoopComplete`, `onEnterFrame` and `onSegementStart` props to support direct event callbacks
- Added styled-component pattern support for `className` and `style` properties
- Updated and completed unit testing for all properties and cases



<a name="1.1.0"></a>
# [1.1.0](https://github.com/chenqingspring/react-lottie/compare/v1.0.0...v1.1.0) (2018-04-03)



<a name="1.0.0"></a>
# [1.0.0](https://github.com/chenqingspring/react-lottie/compare/v0.2.5...v1.0.0) (2018-01-17)



<a name="0.2.5"></a>
## [0.2.5](https://github.com/chenqingspring/react-lottie/compare/v0.2.4...v0.2.5) (2017-12-12)



<a name="0.2.4"></a>
## [0.2.4](https://github.com/chenqingspring/react-lottie/compare/v0.2.3...v0.2.4) (2017-11-08)



<a name="0.2.3"></a>
## [0.2.3](https://github.com/chenqingspring/react-lottie/compare/v0.2.2...v0.2.3) (2017-11-06)



<a name="0.2.2"></a>
## [0.2.2](https://github.com/chenqingspring/react-lottie/compare/v0.2.1...v0.2.2) (2017-10-14)



<a name="0.2.1"></a>
## [0.2.1](https://github.com/chenqingspring/react-lottie/compare/v0.2.0...v0.2.1) (2017-08-21)



<a name="0.2.0"></a>
# [0.2.0](https://github.com/chenqingspring/react-lottie/compare/v0.1.1...v0.2.0) (2017-08-21)



<a name="0.1.1"></a>
## [0.1.1](https://github.com/chenqingspring/react-lottie/compare/v0.1.0...v0.1.1) (2017-07-07)



<a name="0.1.0"></a>
# [0.1.0](https://github.com/chenqingspring/react-lottie/compare/v0.0.8...v0.1.0) (2017-06-27)



<a name="0.0.8"></a>
## [0.0.8](https://github.com/chenqingspring/react-lottie/compare/v0.0.7...v0.0.8) (2017-04-24)



<a name="0.0.7"></a>
## [0.0.7](https://github.com/chenqingspring/react-lottie/compare/v0.0.6...v0.0.7) (2017-04-24)



<a name="0.0.6"></a>
## [0.0.6](https://github.com/chenqingspring/react-lottie/compare/v0.0.5...v0.0.6) (2017-04-22)



<a name="0.0.5"></a>
## [0.0.5](https://github.com/chenqingspring/react-lottie/compare/v0.0.4...v0.0.5) (2017-04-22)



<a name="0.0.4"></a>
## 0.0.4 (2017-04-22)
