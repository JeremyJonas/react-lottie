import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import lottie from 'lottie-web';

const containerStyle = {
  width: '100%',
  height: '100%',
  margin: '0 auto',
};

class Lottie extends PureComponent {
  static get propTypes() {
    return {
      animationData: PropTypes.object.isRequired,
      eventListeners: PropTypes.arrayOf(PropTypes.object),
      isStopped: PropTypes.bool,
      isPaused: PropTypes.bool,
      segments: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
      ]),
      forceSegments: PropTypes.bool,
      loop: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
      ]),
      speed: PropTypes.number,
      direction: PropTypes.number,
      clickToPause: PropTypes.bool,
      height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      className: PropTypes.string,
      style: PropTypes.object,
      ariaRole: PropTypes.string,
      ariaLabel: PropTypes.string,
      title: PropTypes.string,
      innerRef: PropTypes.func,
      animationRef: PropTypes.func,
      onComplete: PropTypes.func,
      onLoopComplete: PropTypes.func,
      onEnterFrame: PropTypes.func,
      onSegmentStart: PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      eventListeners: [],
      isStopped: null,
      isPaused: null,
      speed: 1,
      style: containerStyle,
      clickToPause: false,
      ariaRole: 'button',
      ariaLabel: 'animation',
      title: '',
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      isPaused: nextProps.isPaused,
    };
  }

  state = {}

  componentDidMount() {
    this._loadAnimation();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      animationData, isStopped, segments, forceSegments, speed, direction, loop, eventListeners,
    } = this.props;
    const { isPaused } = this.state;

    // changing animationData requires reload
    let reloaded = false;
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

  componentWillUnmount() {
    this._unregisterEvents(this.props.eventListeners);
    this._destroy();
    this._animation = null;
  }

  get animation() {
    return this._animation;
  }

  get container() {
    return this._container;
  }

  setSpeed(speed) {
    this._animation.setSpeed(speed);
  }

  setDirection(direction) {
    this._animation.setDirection(direction);
  }

  setLoop(loop) {
    this._animation.loop = loop;
  }

  play() {
    this._animation.play();
  }

  playSegments(segments, force) {
    this._animation.playSegments(segments, force);
  }

  stop() {
    this._animation.stop();
  }

  pause() {
    this._animation.pause();
  }

  togglePause = () => {
    this.setState({ isPaused: !this.state.isPaused });
  }

  _handleClick = () => {
    if (this.state.isPaused == null) {
      this.setState({ isPaused: false });
      this.play();
    } else {
      this.togglePause();
    }
  }

  _loadAnimation() {
    const {
      animationData, speed, direction, segments,
      isStopped, loop, title, animationRef, eventListeners,
    } = this.props;
    const { isPaused } = this.state;

    const options = {
      container: this._container,
    };
    // add all non-propTypes props to options
    Object.keys(this.props).forEach((key) => {
      if (!(key in Lottie.propTypes)) {
        options[key] = this.props[key];
      }
    });
    // add lottie options based propTypes to options
    Object.assign(options, {
      animationData,
      speed,
      direction,
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

  _destroy() {
    if (this._animation != null) {
      this._animation.destroy();
    }
  }

  _registerEvents(eventListeners) {
    const {
      onComplete, onLoopComplete, onEnterFrame, onSegmentStart,
    } = this.props;

    if (this._animation != null) {
      if (onComplete != null) this._animation.onComplete = onComplete;
      if (onLoopComplete != null) this._animation.onLoopComplete = onLoopComplete;
      if (onEnterFrame != null) this._animation.onEnterFrame = onEnterFrame;
      if (onSegmentStart != null) this._animation.onSegmentStart = onSegmentStart;

      if (eventListeners != null) {
        eventListeners.forEach((eventListener) => {
          this._animation.addEventListener(eventListener.eventName, eventListener.callback);
        });
      }
    }
  }

  _unregisterEvents(eventListeners) {
    const {
      onComplete, onLoopComplete, onEnterFrame, onSegmentStart,
    } = this.props;

    if (this._animation != null) {
      if (this._animation.onComplete === onComplete) this._animation.onComplete = null;
      if (this._animation.onLoopComplete === onLoopComplete) this._animation.onLoopComplete = null;
      if (this._animation.onEnterFrame === onEnterFrame) this._animation.onEnterFrame = null;
      if (this._animation.onSegmentStart === onSegmentStart) this._animation.onSegmentStart = null;

      if (eventListeners != null) {
        eventListeners.forEach((eventListener) => {
          this._animation.addEventListener(eventListener.eventName, eventListener.callback);
        });
      }
    }
  }

  _setContainerRef = (ref) => {
    this._container = ref;

    if (this.props.innerRef != null) {
      this.props.innerRef(ref);
    }
  }

  render() {
    const {
      className, width, height, clickToPause, ariaRole, ariaLabel, title,
    } = this.props;

    const style = Object.assign({}, this.props.style || {});
    if (width != null) style.width = width;
    if (height != null) style.height = height;

    return (
      <div
        className={className}
        style={style}
        ref={this._setContainerRef}
        onClick={clickToPause ? this._handleClick : null}
        title={title}
        role={ariaRole}
        aria-label={ariaLabel}
      />
    );
  }
}

export {
  Lottie as default,
  containerStyle,
};
