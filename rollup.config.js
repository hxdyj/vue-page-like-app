
import { uglify } from 'rollup-plugin-uglify'
import typescript from 'rollup-plugin-typescript';
import scss from 'rollup-plugin-scss';
import dts from 'rollup-plugin-dts';
export default [
    {
        external: ['vue', 'vue-router'],
        input: 'src/index.ts',
        output: {
            file: 'es/index.js',
            format: 'esm'
        },

        plugins: [
            scss({
                output: 'style/index.css',
            }),
            uglify(),
            typescript(),
        ]
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'typings/index.d.ts',
            format: 'esm'
        },

        plugins: [
            scss({
                output: 'style/index.css',
            }),
            dts()
        ]
    },
]