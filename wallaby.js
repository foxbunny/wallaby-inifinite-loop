const path = require('path')

module.exports = wallaby => {
  // Set up the environment
  process.env.BABEL_ENV = process.env.NODE_ENV = 'test'

  // Add react scripts dependencies to NODE_PATH
  process.env.NODE_PATH += (
    path.delimiter +
    path.join(__dirname, 'node_modules') +
    path.delimiter +
    path.join(__dirname, 'node_modules/react-scripts/node_modules')
  )

  // Reinit paths
  require('module').Module._initPaths()

  // Final wallaby config
  return {
    files: [
      'src/**/*.+(ts|tsx|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
      '!src/**/*.test.ts?(x)'
    ],
    tests: [
      'src/**/*.test.ts?(x)'
    ],
    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript({
        jsx: 'preserve'
      })
    },
    testFramework: 'jest',
    env: { type: 'node' },
    preprocessors: {
      '**/*.js': file => {
        return require('@babel/core').transform(
          file.content,
          {
            sourceMap: true,
            compact: false,
            filename: file.path,
            presets: ['babel-preset-react-app']
          }
        )
      }
    },

    setup (wallaby) {
      const createConfig = require(
        'react-scripts/scripts/utils/createJestConfig')
      const jestConfig = createConfig(
        p => require.resolve('react-scripts/' + p))
      Object.keys(jestConfig.transform || {}).forEach(k => {
        if (k.endsWith('.(ts|tsx)')) {
          void delete jestConfig.transform[k]
        }
      })
      delete jestConfig.testEnvironment
      wallaby.testFramework.configure(jestConfig)
    }
  }
}
