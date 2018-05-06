import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, button } from '@storybook/addon-knobs/react';
import { withDocs } from 'storybook-readme';
import Lottie from '../../src/index';
import * as twitterHeart from '../twitter-heart.json';
import README from './README.md';

const style = {
  width: 400,
  height: 400,
};

storiesOf('Lottie/Advanced', module)
  .addDecorator(withDocs(README))
  .add('Toggle Like', () => {
    return (
      <ToggleLikeExample />
    );
  });

class ToggleLikeExample extends PureComponent {
  state = {
    isLiked: false,
  };

  _toggleLike = () => {
    this.setState({ isLiked: !this.state.isLiked });
  }

  render() {
    const { isLiked } = this.state;

    button('Toggle Like', this._toggleLike);

    return (
      <Lottie
        autoplay={false}
        segments={isLiked ? [0, 116] : [116, 0]}
        forceSegments={boolean('Force Segments', true)}
        speed={isLiked ? 1 : 1.5}
        animationData={twitterHeart}
        style={style}
      />
    );
  }
}
