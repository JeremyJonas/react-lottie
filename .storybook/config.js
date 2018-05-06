import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs/react';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.?stories.jsx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

setOptions({
	addonPanelInRight: true,
});

addDecorator(withKnobs);

configure(loadStories, module);
