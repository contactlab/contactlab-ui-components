'use strict';

export default {
  type: String,
  classes: {
    type: String,
    computed: 'computeClasses(type)',
    readonly: true
  }
}
