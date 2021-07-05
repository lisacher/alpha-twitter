import moment from 'moment'

export const emptyImageFilter = {
    filters: {
      emptyImage(src) {
        return src || 'https://via.placeholder.com/1000x1000/ccc/fff'
      }
    }
  }

  export const timerFilter = {
    filters: {
      fromNow (time) {
        return time ? moment(time).fromNow() : '-'
      }
    }
  }