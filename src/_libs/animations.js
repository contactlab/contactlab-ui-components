/**
 * Animations utilities.
 * @module _libs/animations
 */

const onAnimationComplete = (elem, fn) => {
  if (elem.finished) {
    elem.finished.then(fn);
  } else {
    elem.onfinish = fn;
  }
};

export {onAnimationComplete};
