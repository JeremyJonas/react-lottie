import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs } from 'storybook-readme';
import Lottie from '../../src/index';
import * as checkedDone from '../checked_done_.json';
import README from './README.md';

const style = {
  width: '100%',
  height: '100%',
};

// NOTE: this should use emotion or some other react style library
const svgCss = `
.lottie-viewbox {
  background: tomato;
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

.lottie-viewbox path {
  opacity: 0.5;
  stroke-width: 0.5px;
  stroke: indigo;
}
`;

storiesOf('Lottie/Advanced', module)
  .addDecorator(withDocs(README))
  .add('SVG Styling', () => {
    const options = {
      renderer: 'svg',
      rendererSettings: {
        viewBoxOnly: true,
        viewBoxSize: null,
        className: 'lottie-viewbox',
      },
    };

    return (
      <div>
        <style>{svgCss}</style>
        <Lottie
          loop
          animationData={checkedDone}
          style={style}
          {...options}
        />
      </div>
    );
  });
