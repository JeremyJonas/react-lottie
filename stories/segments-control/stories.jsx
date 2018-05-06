import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number } from '@storybook/addon-knobs/react';
import { withDocs } from 'storybook-readme';
import Lottie from '../../src/index';
import * as pinJump from '../pinjump.json';
import README from './README.md';

const style = {
  width: 400,
  height: 400,
};

storiesOf('Lottie/Advanced', module)
  .addDecorator(withDocs(README))
  .add('Segments Control', () => {
    const startFrame = number('Start Frame', 40, {
      min: 0, max: 116, step: 1,
    }, 'Segments');
    const endFrame = number('End Frame', 55, {
      min: 0, max: 116, step: 1,
    }, 'Segments');

    return (
      <Lottie
        segments={[startFrame, endFrame]}
        animationData={pinJump}
        speed={number('Speed', 1, {
          range: true, min: 0, max: 3, step: 0.01,
        })}
        loop={boolean('Loop', true)}
        style={style}
      />
    );
  });
