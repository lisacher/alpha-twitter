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
        return src || require('../assets/avatar.png')
      }
    }
}

export const daytimeFilter = {
  filters: {
    fromNow(time) {
      moment.locale('zh-tw')
      const now = new Date()
      const timeDate = new Date(time)
      const year = 1000 * 60 * 60 * 24 * 365


      if(!time) {
        return '-'
      }

      if(now.getTime() - timeDate.getTime() < 86400000) {
        return moment(time).fromNow()
      }

      if(now.getTime() - timeDate.getTime() > year ) {
        return '1 年以前'
      }

      return moment(time).format('M月D日')
    }
  }
}
