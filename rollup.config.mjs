import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser'

const common = (args, name) => ({
  output: {
    name,
    dir: 'build',
    format: 'iife',
    indent: false,
  },
  treeshake: !args.configDebug,
  context: 'window',
  onwarn: (warning, _warn) => {
    throw new Error(warning.message)
  },
  plugins: [
    postcss({
      extract: `${name}.css`,
      minimize: true,
    }),
    nodeResolve(),
    commonjs(),
    json({
      compact: true
    }),
    ...(args.configDebug ? [] : [ terser() ])
  ]
})

export default args => [{
  input: './src/app.js',
  ...common(args, 'app')
},{
  input: './src/viper_lib.js',
  ...common(args, 'viper_lib')
},{
  input: './src/app_worker.js',
  ...common(args, 'app_worker')
}]
