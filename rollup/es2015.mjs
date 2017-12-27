import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {

  input: 'src/index.mjs',

  output: {
    file: 'dist/strict-env.mjs',
    format: 'es',
    sourcemap: true,
  },

  plugins: [
    resolve({
      extensions: [ '.mjs' ],
      modulesOnly: true,
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],

};
