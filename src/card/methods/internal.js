'use strict';

const _computeCardClass = (big) => {
  const classes = ['card-title'];
  big ? classes.push('big-icon') : null;
  return classes.join(' ');
}

const _computeEffectClass = (effect) => {
  return ['card', effect].join(' ');
}

const _showActions = (noActions, link) => {
  return !link.hasOwnProperty('href') && !noActions;
}

const _showLink = (noActions, link) => {
  return link.hasOwnProperty('href') && !noActions;
}

const _showTitle = (title) => {
  return title != undefined;
}

export {
  _computeCardClass,
  _computeEffectClass,
  _showActions,
  _showLink,
  _showTitle
}
