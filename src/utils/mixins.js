import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow(dateTime) {
      moment.locale('zh-tw')
      if (!dateTime) return "-";
      return moment(dateTime).fromNow()
    },
  },
}

export const exactDateFilter = {
  filters: {
    exactDate(dateTime) {
      moment.locale('zh-tw')
      if (!dateTime) return "-";
      // return moment(dateTime).format('a h:mm ⋅ YYYY MMMM Do');
      return moment(dateTime).format('a h:mm ⋅ YYYY年M月Do');
    },
  },
}

export const emptyImageFilter = {
    filters: {
      emptyImage(src) {
        return src || 'https://via.placeholder.com/1000x1000/ccc/fff'
      }
    }
}

export const daytimeFilter = {
  filters: {
    fromNow(time) {
      moment.locale('zh-tw')
      const now = new Date()

      if(!time) {
        return '-'
      }

      if(now - time < 8640000) {
        return moment(time).fromNow()
      }

      return moment(time).format('M月D日')
    }
  }
}
