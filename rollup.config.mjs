import terser from '@rollup/plugin-terser';
import baseConfig from './rollup.config.base.mjs';
import dts from 'rollup-plugin-dts';
import packageJson from './package.json' with { type: 'json' };

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'esm',
        sourcemap: true,
      }
    ],
    external: ['react', 'react-dom'],
    preserveModules: true,
    plugins: [
      ...baseConfig.plugins,
      terser()
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm',
    },
    plugins: [dts()]
  }
]