'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containerStyle = exports.Lottie = exports.default = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lottieWeb = require('lottie-web');

var _lottieWeb2 = _interopRequireDefault(_lottieWeb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var containerStyle = {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  margin: '0 auto'
};

// properties that require calling loadAnimation
var reloadProps = ['animationData', 'loop'];

var Lottie = function (_PureComponent) {
  (0, _inherits3.default)(Lottie, _PureComponent);

  function Lottie() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Lottie);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Lottie.__proto__ || (0, _getPrototypeOf2.default)(Lottie)).call.apply(_ref, [this].concat(args))), _this), _this._loadAnimation = function () {
      var _this$props = _this.props,
          animationData = _this$props.animationData,
          speed = _this$props.speed,
          direction = _this$props.direction,
          segments = _this$props.segments,
          eventListeners = _this$props.eventListeners,
          isStopped = _this$props.isStopped,
          loop = _this$props.loop,
          title = _this$props.title,
          animationRef = _this$props.animationRef;
      var isPaused = _this.state.isPaused;


      var options = {
        container: _this._container
      };
      // add all non-propTypes props to options
      (0, _keys2.default)(_this.props).forEach(function (key) {
        if (!(key in Lottie.propTypes)) {
          options[key] = _this.props[key];
        }
      });
      // add lottie options based propTypes to options
      (0, _assign2.default)(options, {
        animationData: animationData,
        speed: speed,
        direction: direction
      });

      if (options.name == null) {
        options.name = title;
      }

      // force autoplay to false if isPaused or isStopped
      if (isStopped || isPaused) {
        options.autoplay = false;
      }

      // use lottie default loop value unless explicitly defined in props
      if (loop != null) {
        options.loop = loop;
      }

      _this._animation = _lottieWeb2.default.loadAnimation(options);
      _this._registerEvents(eventListeners);

      if (animationRef != null) {
        animationRef(_this._animation);
      }

      _this.setSpeed(speed);
      _this.setDirection(direction);

      if (options.autoplay !== false && segments != null) {
        _this.playSegments();
      }
    }, _this._togglePause = function () {
      _this.setState({ isPaused: !_this.state.isPaused });
    }, _this._setContainerRef = function (ref) {
      _this._container = ref;

      if (_this.props.innerRef != null) {
        _this.props.innerRef(ref);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Lottie, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._loadAnimation();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      var _props = this.props,
          isStopped = _props.isStopped,
          segments = _props.segments,
          forceSegments = _props.forceSegments,
          speed = _props.speed,
          direction = _props.direction;
      var isPaused = this.state.isPaused;

      // check if any props that require calling loadAnimation have updated

      reloadProps.forEach(function (propName) {
        if (prevProps[propName] !== _this2.props[propName]) {
          _this2._unregisterEvents(prevProps.eventListeners);
          _this2._destroy();

          _this2._loadAnimation();

          // load animation covers the updates below
          return;
        }
      });

      if (prevProps.speed !== speed) {
        this.setSpeed(speed);
      }

      if (prevProps.direction !== direction) {
        this.setDirection(direction);
      }

      if (isStopped) {
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
    value: function setSpeed() {
      var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.speed;

      this._animation.setSpeed(speed);
    }
  }, {
    key: 'setDirection',
    value: function setDirection() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.direction;

      this._animation.setDirection(direction);
    }
  }, {
    key: 'play',
    value: function play() {
      this._animation.play();
    }
  }, {
    key: 'playSegments',
    value: function playSegments() {
      var segments = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.segments;
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.forceSegments;

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
      if (this.props.isPaused && !this._animation.isPaused) {
        this._animation.pause();
      } else if (!this.props.isPaused && this._animation.isPaused) {
        this._animation.pause();
      }
    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      this._animation.destroy();
    }
  }, {
    key: '_registerEvents',
    value: function _registerEvents(eventListeners) {
      var _this3 = this;

      if (eventListeners != null) {
        eventListeners.forEach(function (eventListener) {
          _this3._animation.addEventListener(eventListener.eventName, eventListener.callback);
        });
      }
    }
  }, {
    key: '_unregisterEvents',
    value: function _unregisterEvents(eventListeners) {
      var _this4 = this;

      if (eventListeners != null) {
        eventListeners.forEach(function (eventListener) {
          _this4._animation.removeEventListener(eventListener.eventName, eventListener.callback);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          className = _props2.className,
          style = _props2.style,
          clickToPause = _props2.clickToPause,
          ariaRole = _props2.ariaRole,
          ariaLabel = _props2.ariaLabel,
          title = _props2.title;


      return (
        // Bug with eslint rules https://github.com/airbnb/javascript/issues/1374
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        _react2.default.createElement('div', {
          className: className, style: style,
          ref: this._setContainerRef,
          onClick: clickToPause ? this.togglePause : null,
          title: title,
          role: ariaRole,
          'aria-label': ariaLabel,
          tabIndex: '0'
        })
      );
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
        eventListeners: _propTypes2.default.arrayOf(_propTypes2.default.object),
        isStopped: _propTypes2.default.bool,
        isPaused: _propTypes2.default.bool,
        segments: _propTypes2.default.arrayOf(_propTypes2.default.number),
        forceSegments: _propTypes2.default.bool,
        animationData: _propTypes2.default.object.isRequired,
        loop: _propTypes2.default.bool,
        speed: _propTypes2.default.number,
        direction: _propTypes2.default.number,
        clickToPause: _propTypes2.default.bool,
        className: _propTypes2.default.string,
        style: _propTypes2.default.object,
        ariaRole: _propTypes2.default.string,
        ariaLabel: _propTypes2.default.string,
        title: _propTypes2.default.string,
        innerRef: _propTypes2.default.func,
        animationRef: _propTypes2.default.func
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        eventListeners: [],
        isStopped: false,
        isPaused: false,
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
}(_react.PureComponent);

exports.default = Lottie;
exports.Lottie = Lottie;
exports.containerStyle = containerStyle;