import React from 'react';
import Lottie from '../index';
import * as animationDataA from './TwitterHeart.json';
import * as animationDataB from './beating-heart.json';

const containerStyle = {
  width: 400,
  height: 400,
};

export default class TransitionLoop extends React.Component {
  state = {
    isStopped: true,
    isPaused: false,
    speed: 1,
    direction: 1,
    isLike: false,
    isTransitioned: false,
  };

  transition() {
    this.setState({ isTransitioned: true });
  }

  clickHandler = () => {
    this.setState({ isTransitioned: false });
  };

  render() {
    const centerStyle = {
      display: 'block',
      margin: '10px auto',
      textAlign: 'center',
    };
    const { isTransitioned } = this.state;

    const eventListeners = isTransitioned ? [] : [{
      eventName: 'loopComplete',
      callback: () => this.transition(),
    }];

    return (
      <div>
        <Lottie
          animationData={!isTransitioned ? animationDataA : animationDataB}
          loop
          autoplay
          style={containerStyle}
          eventListeners={eventListeners}
        />
        <button style={centerStyle} onClick={this.clickHandler}>
          restart
        </button>
      </div>
    );
  }
}
