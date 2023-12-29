import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import autoImports from 'unplugin-auto-import/vite'
import { fileURLToPath } from 'url'
import { resolve } from 'path'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

const ROOT = fileURLToPath(import.meta.url)
const r = (p: string) => resolve(ROOT, '..', p)

export default defineConfig(({ command, mode }) => ({
  base: '/vue3-typescript-admin-template',
  plugins: [
    vue(),
    vueJsx(),
    autoImports({
      imports: ['vue', 'vuex', 'vue-router'],
      dts: 'src/types/auto-imports.d.ts',
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon'
        })
      ]
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep']
        })
      ],
      dts: 'src/types/components.d.ts'
    }),
    VueSetupExtend(),
    createSvgIconsPlugin({
      iconDirs: [r('src/icons/svg')]
    }),
    viteMockServe({
      ignore: /^\_/,
      localEnabled: command === 'serve',
      prodEnabled: command === 'build',
      injectCode: `
      import { setupMockServer } from '../mock/_mock-server';
      setupMockServer();
    `
    }),
    Icons()
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: r('src')
      }
    ],
    extensions: ['.ts', '.tsx', '.js', '.vue']
  }
}))
