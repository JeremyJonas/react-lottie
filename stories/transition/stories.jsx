import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import { button } from '@storybook/addon-knobs/react';
import { withDocs } from 'storybook-readme';
import Lottie from '../../src/index';
import * as twitterHeart from '../twitter-heart.json';
import * as beatingHeart from '../beating-heart.json';
import README from './README.md';

const style = {
  width: 400,
  height: 400,
};

storiesOf('Lottie/Advanced', module)
  .addDecorator(withDocs(README))
  .add('Transition', () => {
    return (
      <TransitionExample />
    );
  });


class TransitionExample extends PureComponent {
  state = {
    isTransitioned: false,
  };

  _transition = () => {
    this.setState({ isTransitioned: true });
  }

  _reset = () => {
    this.setState({ isTransitioned: false });
  }

  render() {
    button('Reset', this._reset);

    const { isTransitioned } = this.state;
    const eventListeners = isTransitioned ? [] : [{
      eventName: 'loopComplete',
      callback: this._transition,
    }];

    return (
      <Lottie
        eventListeners={eventListeners}
        animationData={!isTransitioned ? twitterHeart : beatingHeart}
        loop
        style={style}
      />
    );
  }
}
