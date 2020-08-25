const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function getRules(type) {
  const cssLoaders = {
    dev: ['style-loader', 'css-loader'],
    prod: [MiniCssExtractPlugin.loader, 'css-loader'],
  };

  const scssLoaders = {
    dev: ['style-loader', 'css-loader', 'sass-loader'],
    prod: [
      { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
      'css-loader',
      'sass-loader'
    ]
  };

  return [
    {
      test: /\.pug$/,
      loader: 'pug-loader',
    },
    {
      test: /\.(css)$/,
      use: cssLoaders[type],
    },
    {
      test: /\.(scss)$/,
      use: scssLoaders[type],
    },
    {
      test: /\.(png|jpg|svg|gif)$/,
      loader: 'file-loader',
      exclude: [
        path.resolve(__dirname, '../src/assets/fonts/'),
      ],
      options: {
        outputPath: 'assets/img/',
      },
    },
    {
      test: /\.(ttf|woff|svg|eot|woff2)$/,
      include: [
        path.resolve(__dirname, '../src/assets/fonts/'),
      ],
      loader: 'file-loader',
      options: {
        outputPath: 'assets/fonts/',
      },
    },
  ];
}

function getHTMLPlugins() {
  const pages = [
    'colors-and-type',
    'form-elements',
    'cards',
    'headers-and-footers',
    'landing-page',
    'search-room',
    'room-details',
    'registration',
    'sign-in',
    'index',
  ];

  return pages.map((page) => (
    new HTMLWebpackPlugin({
      currentEnv: process.env.NODE_ENV,
      filename: `${page}.html`,
      template: `../src/pages/${page}/${page}.pug`,
      inject: false,
    })
  ));
}

function getPlugins(type) {
  return [
    ...getHTMLPlugins(),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ].concat(type === 'prod' ? (
    new MiniCssExtractPlugin({
      filename: 'styles/[name].bundle.css',
    })
  ) : []);
}

const commonConfig = {
  target: 'web',
  context: path.resolve(__dirname, '..', 'src'),
  entry: {
    'colors-and-type': './pages/colors-and-type/colors-and-type.scss',
    'form-elements': [
      './pages/form-elements/form-elements.js',
      './pages/form-elements/form-elements.scss',
    ],
    cards: [
      './pages/cards/cards.js',
      './pages/cards/cards.scss',
    ],
    'headers-and-footers': './pages/headers-and-footers/headers-and-footers.scss',
    'landing-page': [
      './pages/landing-page/landing-page.js',
      './pages/landing-page/landing-page.scss',
    ],
    'search-room': [
      './pages/search-room/search-room.js',
      './pages/search-room/search-room.scss',
    ],
    'room-details': [
      './pages/room-details/room-details.js',
      './pages/room-details/room-details.scss',
    ],
    registration: [
      './pages/registration/registration.js',
      './pages/registration/registration.scss',
    ],
    'sign-in': './pages/sign-in/sign-in.scss',
    index: './pages/index/index.scss',
  },
  output: {
    filename: 'scripts/[name].bundle.js',
    path: path.resolve(__dirname, '..', 'dist'),
  },
  resolve: {
    alias: {
      '@layouts': path.resolve(__dirname, '../src/layouts'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@blocks': path.resolve(__dirname, '../src/blocks'),
      '@styles': path.resolve(__dirname, '../src/assets/styles'),
      '@fonts': path.resolve(__dirname, '../src/assets/styles/fonts'),
    },
  },
};

module.exports = { commonConfig, getRules, getPlugins };
