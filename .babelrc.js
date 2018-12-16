module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: process.env.ESM ? false : 'commonjs',
      },
    ],
    '@babel/preset-react',
  ],
  plugins: ['@babel/plugin-proposal-object-rest-spread'],
}
