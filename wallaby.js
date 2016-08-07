module.exports = (wallaby) => {
  return {
    files: [
      'src/*.js',
      'test/helper/template.js'
    ],
    tests: [
      'spec/*.js'
    ],
    debug: true,
    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },
    env: {
      type: 'node',
      runner: 'node'  // or full path to any node executable
    }
  }
}