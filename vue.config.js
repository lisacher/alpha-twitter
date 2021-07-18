module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/alpha-twitter/'
    : '/',
  // devServer: {
  //   proxy: {
  //     '/socket.io': {
  //       target: 'https://twittertest8111009.herokuapp.com/api/chat',
  //       ws: true,
  //       changeOrigin: true
  //     },
  //     'sockjs-node': {
  //       target: 'https://twittertest8111009.herokuapp.com/api/chat',
  //       ws: false,
  //       changeOrigin: true
  //     },
  //   }
  // }
}