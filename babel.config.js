module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            "@assets": './src/assets',
            "@components": './src/components',
            "@features": './src/features',
            "@navigation": './src/navigation',
            "@service": './src/service',
            "@state": './src/state',
            "@styles": './src/styles',
            "@utils": './src/utils',
          }
        }
      ]
    ]  
  };
};
