import babel from 'rollup-plugin-babel';

export default {

  input: 'src/index.mjs',

  output: {
    file: 'dist/strict-env.js',
    format: 'cjs',
    sourcemap: true,
  },

  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],

};
