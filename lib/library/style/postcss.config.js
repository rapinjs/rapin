module.exports = function () {
  return {
    syntax: 'postcss-scss',
    plugins: [
      require('postcss-nested')({}),
      require('postcss-import-sync')({}),
      require('postcss-pxtorem')({
        rootValue: 14,
        unitPrecision: 5,
        propList: ['*'],
        selectorBlackList: ['body'],
        replace: true,
        mediaQuery: true,
        minPixelValue: 0
      }),
      require('postcss-font-magician')({
        protocol: 'https:',
        foundries: 'bootstrap google'
      }),
    ],
    options: {}
  }
};
