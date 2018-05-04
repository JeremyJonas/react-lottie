import React from 'react';
import Lottie from '../index';
import * as animationDataA from './TwitterHeart.json';

const containerStyle = {
  width: 400,
  height: 400,
};

export default class ToggleLike extends React.Component {

  state = {
    isLike: false,
    speed: 1,
  };

  _handleClick = () => {
    const isLike = !this.state.isLike;

    this.setState({
      segments: isLike ? [0, 116] : [116, 0],
      speed: isLike ? 1 : 1.5,
      isLike,
    });
  }

  render() {
    const centerStyle = {
      display: 'block',
      margin: '10px auto',
      textAlign: 'center',
    };
    const { speed, isLike, segments } = this.state;

    return (
      <div>
        <Lottie
          autoplay={false}
          animationData={animationDataA}
          segments={segments}
          forceSegments
          style={containerStyle}
          speed={speed}
        />
        <button style={centerStyle} onClick={this._handleClick}>{isLike ? 'unlike' : 'like'}</button>
      </div>
    );
  }
}
