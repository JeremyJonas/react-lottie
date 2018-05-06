import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs } from 'storybook-readme';
import Lottie from '../../src/index';
import * as pinJump from '../pinjump.json';
import README from './README.md';

storiesOf('Lottie/Basic', module)
  .addDecorator(withDocs(README))
  .add('Default', () => {
    return (
      <Lottie animationData={pinJump} />
    );
  })
  .add('Looping', () => {
    return (
      <Lottie animationData={pinJump} loop />
    );
  })
  .add('Click to Start/Pause', () => {
    return (
      <Lottie animationData={pinJump} autoplay={false} loop clickToPause />
    );
  })
  .add('Size', () => {
    return (
      <Lottie animationData={pinJump} width={200} height={200} />
    );
  })
  .add('Segments', () => {
    return (
      <Lottie animationData={pinJump} loop segments={[40, 52]} />
    );
  })
  .add('Styled', () => {
    return (
      <Lottie
        animationData={pinJump}
        style={{
          width: 400,
          height: 400,
          opacity: 0.5,
          background: 'indigo',
        }}
      />
    );
  });
