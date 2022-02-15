module.exports = async config => {
  config.module.rules.push({
    enforce: 'pre',
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    exclude: /node_modules/
  });
  config.module.rules.push({
    test: /\.css$/i,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                // Convert modern CSS into something most browsers can understand
                'postcss-preset-env',
                {
                  // Options
                }
              ]
            ]
          }
        }
      }
    ]
  });
  return config;
};
