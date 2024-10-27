import React from 'react';
import commonPackageTemplate from './commonPackageTemplate.jsx';

export default require('maco').template(pupsichek, React);

function pupsichek(props) {
  var model = props.model;

  var link = 'https://github.com/innuendos/pupsichek/tree/main/' + encodeURIComponent(model.name);
  var linkText = model.name;

  return commonPackageTemplate(model, link, linkText);
}