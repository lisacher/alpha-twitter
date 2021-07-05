export const emptyImageFilter = {
    filters: {
      emptyImage(src) {
        return src || 'https://via.placeholder.com/1000x1000/ccc/fff'
      }
    }
  }