import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import lottie from 'lottie-web';

const containerStyle = {
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  margin: '0 auto',
};

// properties that require calling loadAnimation
const reloadProps = ['animationData', 'loop'];

class Lottie extends PureComponent {
  static get propTypes() {
    return {
      eventListeners: PropTypes.arrayOf(PropTypes.object),
      isStopped: PropTypes.bool,
      isPaused: PropTypes.bool,
      segments: PropTypes.arrayOf(PropTypes.number),
      forceSegments: PropTypes.bool,
      animationData: PropTypes.object.isRequired,
      loop: PropTypes.bool,
      speed: PropTypes.number,
      direction: PropTypes.number,
      clickToPause: PropTypes.bool,
      className: PropTypes.string,
      style: PropTypes.object,
      ariaRole: PropTypes.string,
      ariaLabel: PropTypes.string,
      title: PropTypes.string,
      innerRef: PropTypes.func,
      animationRef: PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      eventListeners: [],
      isStopped: false,
      isPaused: false,
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


  componentDidMount() {
    this._loadAnimation();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isStopped, segments, forceSegments, speed, direction } = this.props;
    const { isPaused } = this.state;

    // check if any props that require calling loadAnimation have updated
    reloadProps.forEach((propName) => {
      if (prevProps[propName] !== this.props[propName]) {
        this._unregisterEvents(prevProps.eventListeners);
        this._destroy();

        this._loadAnimation();

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

  componentWillUnmount() {
    this._unregisterEvents(this.props.eventListeners);
    this._destroy();
    this._animation = null;
  }

  setSpeed(speed = this.props.speed) {
    this._animation.setSpeed(speed);
  }

  setDirection(direction = this.props.direction) {
    this._animation.setDirection(direction);
  }

  play() {
    this._animation.play();
  }

  playSegments(segments = this.props.segments, force = this.props.forceSegments) {
    this._animation.playSegments(segments, force);
  }

  stop() {
    this._animation.stop();
  }

  pause() {
    if (this.props.isPaused && !this._animation.isPaused) {
      this._animation.pause();
    } else if (!this.props.isPaused && this._animation.isPaused) {
      this._animation.pause();
    }
  }


  _loadAnimation = () => {
    const {
      animationData, speed, direction, segments, eventListeners,
      isStopped, loop, title, animationRef,
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
    if (isStopped || isPaused) {
      options.autoplay = false;
    }

    // use lottie default loop value unless explicitly defined in props
    if (loop != null) {
      options.loop = loop;
    }

    this._animation = lottie.loadAnimation(options);
    this._registerEvents(eventListeners);

    if (animationRef != null) {
      animationRef(this._animation);
    }

    this.setSpeed(speed);
    this.setDirection(direction);

    if (options.autoplay !== false && segments != null) {
      this.playSegments();
    }
  }

  _destroy() {
    this._animation.destroy();
  }

  _registerEvents(eventListeners) {
    if (eventListeners != null) {
      eventListeners.forEach((eventListener) => {
        this._animation.addEventListener(eventListener.eventName, eventListener.callback);
      });
    }
  }

  _unregisterEvents(eventListeners) {
    if (eventListeners != null) {
      eventListeners.forEach((eventListener) => {
        this._animation.removeEventListener(eventListener.eventName, eventListener.callback);
      });
    }
  }

  _togglePause = () => {
    this.setState({ isPaused: !this.state.isPaused });
  }

  _setContainerRef = (ref) => {
    this._container = ref;

    if (this.props.innerRef != null) {
      this.props.innerRef(ref);
    }
  }

  render() {
    const {
      className, style,
      clickToPause,
      ariaRole, ariaLabel, title,
    } = this.props;

    return (
      // Bug with eslint rules https://github.com/airbnb/javascript/issues/1374
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={className} style={style}
        ref={this._setContainerRef}
        onClick={clickToPause ? this.togglePause : null}
        title={title}
        role={ariaRole}
        aria-label={ariaLabel}
        tabIndex="0"
      />
    );
  }
}

export {
  Lottie as default,
  Lottie,
  containerStyle,
};
