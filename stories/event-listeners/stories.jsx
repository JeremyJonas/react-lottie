import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import { withDocs } from 'storybook-readme';
import Lottie from '../../src/index';
import * as twitterHeart from '../twitter-heart.json';
import README from './README.md';

storiesOf('Lottie/Advanced', module)
  .addDecorator(withDocs(README))
  .add('Event Listeners', () => {
    return (
      <Lottie
        eventListeners={[
          {
            eventName: 'complete',
            callback: action('complete'),
          },
          {
            eventName: 'loopComplete',
            callback: action('loopComplete'),
          },
        ]}
        animationData={twitterHeart}
        isStopped={boolean('Stopped', false)}
        isPaused={boolean('Paused', false)}
        speed={number('Speed', 1, {
          range: true, min: 0, max: 3, step: 0.01,
        })}
        direction={boolean('Reverse', false) ? -1 : 1}
        loop={boolean('Loop', true)}
      />
    );
  })
  .add('Event Listeners (proxied)', () => {
    return (
      <Lottie
        onComplete={action('onComplete')}
        onLoopComplete={action('onLoopComplete')}
        animationData={twitterHeart}
        isStopped={boolean('Stopped', false)}
        isPaused={boolean('Paused', false)}
        speed={number('Speed', 1, {
          range: true, min: 0, max: 3, step: 0.01,
        })}
        direction={boolean('Reverse', false) ? -1 : 1}
        loop={boolean('Loop', true)}
      />
    );
  });
