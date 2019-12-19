export default {
  tot: {
    type: Number,
    observer: '_setPages'
  },
  links: {
    type: Array
  },
  pages: {
    type: Array,
    notify: true,
    value: []
  },
  currentPage: {
    type: Number,
    notify: true,
    value: 0
  },
  range: {
    type: Number,
    value: 8
  },
  firstPage: {
    type: String,
    value: 0
  },
  lastPage: {
    type: String,
    computed: '_getLastPage(pages)'
  },
  prevPage: {
    type: String,
    computed: '_getPrevPage(pages, currentPage)'
  },
  nextPage: {
    type: String,
    computed: '_getNextPage(pages, currentPage)'
  },
  availableStart: {
    type: Number,
    computed: '_getStart(currentPage, pages)'
  },
  availableEnd: {
    type: Number,
    computed: '_getEnd(currentPage, pages)'
  }
};
