import React from 'react';
import Lottie from '../index';
import * as animationDataA from './TwitterHeart.json';
import * as animationDataB from './beating-heart.json';

const containerStyle = {
  width: 400,
  height: 400,
};

/**
 * TransitionWithOptions: demonstrates how you can switch to a
 * new animation with different options. For example, you can start
 * with a looped animation and change to one that plays only once
 * without mounting the component again
 */
export default class TransitionWithOptions extends React.Component {
  state = {
    showLoopedAnimation: true,
  }

  clickHandler = () => {
    this.setState({ showLoopedAnimation: !this.state.showLoopedAnimation });
  };

  render() {
    const centerStyle = {
      display: 'block',
      margin: '20px auto',
      textAlign: 'center',
    };
    const { showLoopedAnimation } = this.state;

    return (
      <div>
        <Lottie
          animationData={showLoopedAnimation ? animationDataA : animationDataB}
          loop={showLoopedAnimation}
          style={containerStyle}
        />
        <p style={centerStyle}>This animation is {showLoopedAnimation ? 'looped' : 'not looped'}</p>
        <button style={centerStyle} onClick={this.clickHandler}>
          switch
        </button>
      </div>
    );
  }
}
