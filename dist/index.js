import _Object$assign from 'babel-runtime/core-js/object/assign';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import lottie from 'lottie-web';

var containerStyle = {
  width: '100%',
  height: '100%',
  margin: '0 auto'
};

var Lottie = function (_PureComponent) {
  _inherits(Lottie, _PureComponent);

  function Lottie() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Lottie);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Lottie.__proto__ || _Object$getPrototypeOf(Lottie)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.togglePause = function () {
      _this.setState({ isPaused: !_this.state.isPaused });
    }, _this._handleClick = function () {
      if (_this.state.isPaused == null) {
        _this.setState({ isPaused: false });
        _this.play();
      } else {
        _this.togglePause();
      }
    }, _this._setContainerRef = function (ref) {
      _this._container = ref;

      if (_this.props.innerRef != null) {
        _this.props.innerRef(ref);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Lottie, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._loadAnimation();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props = this.props,
          animationData = _props.animationData,
          isStopped = _props.isStopped,
          segments = _props.segments,
          forceSegments = _props.forceSegments,
          speed = _props.speed,
          direction = _props.direction,
          loop = _props.loop,
          eventListeners = _props.eventListeners;
      var isPaused = this.state.isPaused;

      // changing animationData requires reload

      var reloaded = false;
      if (prevProps.animationData !== animationData) {
        this._unregisterEvents(prevProps.eventListeners);
        this._destroy();

        this._loadAnimation();
        reloaded = true;
      }

      // ignore properties are set during reload
      if (!reloaded) {
        if (prevProps.eventListeners !== eventListeners) {
          this._registerEvents(eventListeners);
        }

        if (prevProps.loop !== loop) {
          this.setLoop(loop);
        }
      }

      if (prevProps.speed !== speed) {
        this.setSpeed(speed);
      }

      if (prevProps.direction !== direction) {
        this.setDirection(direction);
      }

      if (isStopped === true || isPaused === true) {
        if (prevState.isPaused !== isPaused) {
          this.pause();
        }
        if (prevProps.isStopped !== isStopped) {
          this.stop();
        }
      } else if (prevProps.segments !== segments) {
        this.playSegments(segments, forceSegments);
      } else if (prevProps.isStopped) {
        this.play();
      } else if (prevState.isPaused !== isPaused) {
        if (isPaused && this._animation.isPaused !== true) {
          this.pause();
        } else if (!isPaused && this._animation.isPaused !== false) {
          this.play();
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._unregisterEvents(this.props.eventListeners);
      this._destroy();
      this._animation = null;
    }
  }, {
    key: 'setSpeed',
    value: function setSpeed(speed) {
      this._animation.setSpeed(speed);
    }
  }, {
    key: 'setDirection',
    value: function setDirection(direction) {
      this._animation.setDirection(direction);
    }
  }, {
    key: 'setLoop',
    value: function setLoop(loop) {
      this._animation.loop = loop;
    }
  }, {
    key: 'play',
    value: function play() {
      this._animation.play();
    }
  }, {
    key: 'playSegments',
    value: function playSegments(segments, force) {
      this._animation.playSegments(segments, force);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this._animation.stop();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this._animation.pause();
    }
  }, {
    key: '_loadAnimation',
    value: function _loadAnimation() {
      var _this2 = this;

      var _props2 = this.props,
          animationData = _props2.animationData,
          speed = _props2.speed,
          direction = _props2.direction,
          segments = _props2.segments,
          isStopped = _props2.isStopped,
          loop = _props2.loop,
          title = _props2.title,
          animationRef = _props2.animationRef,
          eventListeners = _props2.eventListeners;
      var isPaused = this.state.isPaused;


      var options = {
        container: this._container
      };
      // add all non-propTypes props to options
      _Object$keys(this.props).forEach(function (key) {
        if (!(key in Lottie.propTypes)) {
          options[key] = _this2.props[key];
        }
      });
      // add lottie options based propTypes to options
      _Object$assign(options, {
        animationData: animationData,
        speed: speed,
        direction: direction
      });

      if (options.name == null) {
        options.name = title;
      }

      // force autoplay to false if isPaused or isStopped
      if (isStopped === true || isPaused === true) {
        options.autoplay = false;
      }

      // use lottie default loop value unless explicitly defined in props
      if (loop != null) {
        options.loop = loop;
      }

      this._animation = lottie.loadAnimation(options);
      if (animationRef != null) {
        animationRef(this._animation);
      }

      this._registerEvents(eventListeners);

      this.setSpeed(speed);
      this.setDirection(direction);

      if (options.autoplay !== false && segments != null) {
        this.playSegments(segments, true);
      }
    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      if (this._animation != null) {
        this._animation.destroy();
      }
    }
  }, {
    key: '_registerEvents',
    value: function _registerEvents(eventListeners) {
      var _this3 = this;

      var _props3 = this.props,
          onComplete = _props3.onComplete,
          onLoopComplete = _props3.onLoopComplete,
          onEnterFrame = _props3.onEnterFrame,
          onSegmentStart = _props3.onSegmentStart;


      if (this._animation != null) {
        if (onComplete != null) this._animation.onComplete = onComplete;
        if (onLoopComplete != null) this._animation.onLoopComplete = onLoopComplete;
        if (onEnterFrame != null) this._animation.onEnterFrame = onEnterFrame;
        if (onSegmentStart != null) this._animation.onSegmentStart = onSegmentStart;

        if (eventListeners != null) {
          eventListeners.forEach(function (eventListener) {
            _this3._animation.addEventListener(eventListener.eventName, eventListener.callback);
          });
        }
      }
    }
  }, {
    key: '_unregisterEvents',
    value: function _unregisterEvents(eventListeners) {
      var _this4 = this;

      var _props4 = this.props,
          onComplete = _props4.onComplete,
          onLoopComplete = _props4.onLoopComplete,
          onEnterFrame = _props4.onEnterFrame,
          onSegmentStart = _props4.onSegmentStart;


      if (this._animation != null) {
        if (this._animation.onComplete === onComplete) this._animation.onComplete = null;
        if (this._animation.onLoopComplete === onLoopComplete) this._animation.onLoopComplete = null;
        if (this._animation.onEnterFrame === onEnterFrame) this._animation.onEnterFrame = null;
        if (this._animation.onSegmentStart === onSegmentStart) this._animation.onSegmentStart = null;

        if (eventListeners != null) {
          eventListeners.forEach(function (eventListener) {
            _this4._animation.addEventListener(eventListener.eventName, eventListener.callback);
          });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props,
          className = _props5.className,
          width = _props5.width,
          height = _props5.height,
          clickToPause = _props5.clickToPause,
          ariaRole = _props5.ariaRole,
          ariaLabel = _props5.ariaLabel,
          title = _props5.title;


      var style = _Object$assign({}, this.props.style || {});
      if (width != null) style.width = width;
      if (height != null) style.height = height;

      return React.createElement('div', {
        className: className,
        style: style,
        ref: this._setContainerRef,
        onClick: clickToPause ? this._handleClick : null,
        title: title,
        role: ariaRole,
        'aria-label': ariaLabel
      });
    }
  }, {
    key: 'animation',
    get: function get() {
      return this._animation;
    }
  }, {
    key: 'container',
    get: function get() {
      return this._container;
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps) {
      return {
        isPaused: nextProps.isPaused
      };
    }
  }, {
    key: 'propTypes',
    get: function get() {
      return {
        /**
         * An Object with the exported animation data
         */
        animationData: PropTypes.object.isRequired,
        /**
         * Controls stopped behavior of Lottie instance
         */
        isStopped: PropTypes.bool,
        /**
         * Controls paused behavior of Lottie instance
         */
        isPaused: PropTypes.bool,
        /**
         * Defines what segment of the animation to play using
         * [playSegments(segments, force)](https://github.com/airbnb/lottie-web#playsegmentssegments-forceflag)
         */
        segments: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))]),
        /**
         * Indicates `force` parameter value of
         * [playSegments(segments, force)](https://github.com/airbnb/lottie-web#playsegmentssegments-forceflag)
         * when using segments
         */
        forceSegments: PropTypes.bool,
        /**
         * Indicates if animation is looping, defaults to lottie default of `false`
         */
        loop: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
        /**
         * Controls speed of animation playback through
         * [setSpeed(speed)](https://github.com/airbnb/lottie-web#setspeedspeed)
         */
        speed: PropTypes.number,
        /**
         * Controls direction of animation playback through
         * [setDirection(direction)](https://github.com/airbnb/lottie-web#setdirectiondirection)
         */
        direction: PropTypes.number,
        /**
         * Registers [event](https://github.com/airbnb/lottie-web#events)
         * callbacks with Lottie instance.
         * @example `[{ eventName: 'complete', callback: console.log }]`
         */
        eventListeners: PropTypes.arrayOf(PropTypes.object),
        /**
         * Enables clicking on animation to toggle play/pause
         */
        clickToPause: PropTypes.bool,
        /**
         * Shorthand for setting `style.height`
         */
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * Shorthand for setting `style.width`
         */
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /**
         * Sets `className` property of container div
         */
        className: PropTypes.string,
        /**
         * Sets inline style of container div
         */
        style: PropTypes.object,
        /**
         * Sets **aria** `role` of container div
         */
        ariaRole: PropTypes.string,
        /**
         * Sets  **aria** `aria-label` of container div
         */
        ariaLabel: PropTypes.string,
        /**
         * Sets  **aria** `title` of container div
         */
        title: PropTypes.string,
        /**
         * Callback to receive reference to container div node
         * @callback (ref) => this.container = ref
         */
        innerRef: PropTypes.func,
        /**
         * Callback to receive reference to Lottie animation instance
         * @callback (ref) => this.animationInstance = ref
         */
        animationRef: PropTypes.func,
        /**
         * Direct event callback for `complete` [event](https://github.com/airbnb/lottie-web#events)
         */
        onComplete: PropTypes.func,
        /**
         * Direct event callback for `loopComplete` [event](https://github.com/airbnb/lottie-web#events)
         */
        onLoopComplete: PropTypes.func,
        /**
         * Direct event callback for `enterFrame` [event](https://github.com/airbnb/lottie-web#events)
         */
        onEnterFrame: PropTypes.func,
        /**
         * Direct event callback for `segmentStart` [event](https://github.com/airbnb/lottie-web#events)
         */
        onSegmentStart: PropTypes.func
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        eventListeners: [],
        isStopped: null,
        isPaused: null,
        speed: 1,
        style: containerStyle,
        clickToPause: false,
        ariaRole: 'button',
        ariaLabel: 'animation',
        title: ''
      };
    }
  }]);

  return Lottie;
}(PureComponent);

export { Lottie as default, containerStyle };