module.exports = function () {
    return {
      syntax: 'postcss-scss',
      plugins: [
        require('postcss-nested')({}),
        require('postcss-import-sync')({}),
        require('postcss-font-magician')({
          protocol: 'https:',
          foundries: 'bootstrap google'
        }),
      ],
      options: {}
    }
  };
  