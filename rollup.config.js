import del from 'rollup-plugin-delete';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import externals from 'rollup-plugin-node-externals';

import pkg from './package.json';

const extensions = ['.ts', '.tsx'];

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    del({ targets: 'dist/*' }),
    externals({ deps: true }),
    resolve({ extensions }),
    typescript({ tsconfig: './tsconfig.json' }),
    commonjs(),
    babel({
      extensions,
      include: ['src/**/*'],
      exclude: '**/node_modules/**',
      babelHelpers: 'runtime'
    })
  ]
};
