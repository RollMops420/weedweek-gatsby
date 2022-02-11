const React = require('react');
const { PageComponent } = require('./src/wrapPageComponent');
require('@fontsource/poppins/400.css');
require('@fontsource/poppins/500.css');
require('@fontsource/rubik');

// Wraps every page in a component
exports.wrapPageElement = ({ element, props }) => {
  return <PageComponent props={props}>{element}</PageComponent>;
};
