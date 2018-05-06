import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, select, button } from '@storybook/addon-knobs/react';
import { withDocs } from 'storybook-readme';
import Lottie from '../../src/index';
import * as pinJump from '../pinjump.json';
import * as twitterHeart from '../twitter-heart.json';
import README from './README.md';

const animations = {
  'Pin Jump': pinJump,
  'Twitter Heart': twitterHeart,
};

const style = {
  width: 400,
  height: 400,
};

storiesOf('Lottie/Advanced', module)
  .addDecorator(withDocs(README))
  .add('Playback Control', () => {
    return (
      <PlaybackControlExample
        animationData={animations[select('Animation', Object.keys(animations), 'Pin Jump')]}
        speed={number('Speed', 1, {
          range: true, min: 0, max: 3, step: 0.01,
        })}
        direction={boolean('Reverse', false) ? -1 : 1}
        loop={boolean('Loop', true)}
      />
    );
  });


class PlaybackControlExample extends PureComponent {
  state = {
    isStopped: false,
    isPaused: false,
  };

  _stop = () => {
    this.setState({ isStopped: true });
  }

  _pause = () => {
    this.setState({ isPaused: !this.state.isPaused });
  }

  _play = () => {
    this.setState({ isStopped: false, isPaused: false });
  }

  render() {
    const { isStopped, isPaused } = this.state;

    button('Stop', this._stop);
    button('Pause', this._pause);
    button('Play', this._play);

    return (
      <Lottie
        isStopped={isStopped}
        isPaused={isPaused}
        style={style}
        {...this.props}
      />
    );
  }
}
