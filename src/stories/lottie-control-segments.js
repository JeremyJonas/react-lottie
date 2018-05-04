import React from 'react';
import Lottie from '../index';
import * as animationDataA from './pinjump.json';
import * as animationDataB from './TwitterHeart.json';

const containerStyle = {
  width: 400,
  height: 400,
};

const labelStyle = {
  display: 'block',
  margin: '10px auto',
  textAlign: 'center',
};

export default class LottieControlSegment extends React.Component {
  state = {
    isStopped: false,
    isPaused: false,
    speed: 1,
    direction: 1,
    isDataA: true,
    startFrame: 40,
    endFrame: 60,
    loop: true,
    forceSegments: true,
  }

  _handleInputChange = (event) => {
    const { name, type, checked } = event.currentTarget;
    let value = event.currentTarget.value;
    // eslint-disable-next-line default-case
    switch (type) {
      case 'number':
        value = parseInt(value, 10) || 0;
        break;
      case 'range':
        value = parseFloat(value);
        break;
      case 'checkbox':
        value = checked;
        break;
    }

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      isStopped, isPaused, direction, speed, isDataA,
      startFrame, endFrame, loop, forceSegments,
    } = this.state;

    return (
      <div>
        <Lottie
          animationData={isDataA ? animationDataA : animationDataB}
          style={containerStyle}
          isStopped={isStopped}
          isPaused={isPaused}
          speed={speed}
          segments={[startFrame, endFrame]}
          forceSegments={forceSegments}
          direction={direction}
          loop={loop === true}
        />

        <label style={labelStyle}>
          Speed: x{speed}
          <input
            name="speed" type="range" value={speed} min="0" max="3" step="0.5"
            onChange={this._handleInputChange}
          />
        </label>

        <label style={labelStyle}>
          Loop
          <input name="loop" type="checkbox" checked={loop === true} onChange={this._handleInputChange} />
        </label>

        <label style={labelStyle}>
          Force Segments
          <input name="forceSegments" type="checkbox" checked={forceSegments === true} onChange={this._handleInputChange} />
        </label>

        <label style={labelStyle}>
          Segment range: [{startFrame}, {endFrame}]
          <div>
            <input name="startFrame" type="number" value={startFrame} onChange={this._handleInputChange} />
            <input name="endFrame" type="number" value={endFrame} onChange={this._handleInputChange} />
          </div>
        </label>
      </div>
    );
  }
}
