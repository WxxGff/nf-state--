import { fileURLToPath, URL } from 'url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
const pathResolve = (dir: string) => fileURLToPath(new URL(dir, import.meta.url))

// https://vitejs.dev/config/
const project = (url: string) => {
  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': pathResolve('./src'), // fileURLToPath(new URL('./src', import.meta.url)),
        '/nf-state': pathResolve('./lib/main') //
      }
    },
    base: url,
    // 打包配置
    build: {
      sourcemap: true,
      outDir: 'distp', //指定输出路径
      assetsDir: 'static/img/', // 指定生成静态资源的存放路径
      brotliSize: false, // 不统计
      target: 'esnext', 
      minify: 'esbuild', // 混淆器，terser构建后文件体积更小
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const arr = id.toString().split('node_modules/')[1].split('/')
              switch(arr[0]) {
                case '@naturefw': // 自然框架
                case '@popperjs':
                case '@vue':
                // eslint-disable-next-line no-fallthrough
                case 'element-plus': // UI 库
                case '@element-plus': // 图标
                  return '_' + arr[0]
                  // break
                default :
                  return '__vendor'
                  // break
              }
            }
          },
          chunkFileNames: 'static/js1/[name]-[hash].js',
          entryFileNames: 'static/js2/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  })
}

// 库项目打包
const lib = () => {
  return defineConfig({
    plugins: [vue()],
    // 打包配置
    build: {
      outDir: `dist`,
      lib: {
        entry: pathResolve(`lib/main.ts`),
        name: 'nfState',
        formats: ['es', 'umd'],
        fileName: (format) => `nf-state.${format}.js`
      },
      sourcemap: true,
      brotliSize: false, // 不统计
      target: 'esnext', 
      minify: 'esbuild', // 混淆器，terser构建后文件体积更小
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: [
          'vue',
          '@naturefw/nf-state',
          '@naturefw/storage',
          '@naturefw/ui-core',
          '@naturefw/ui-elp',
          'element-plus',
          'dayjs'
        ],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
            dayjs: 'dayjs',
            '@naturefw/nf-state': 'nfState',
            '@naturefw/storage': 'nfWebStorage',
            '@naturefw/ui-core': 'nfUICore',
            '@naturefw/ui-elp': 'nfUIElp',
            'element-plus': 'ElementPlus'
          }
        }
      }
    }
  })
}

export default (opt: any) => {
  const { mode } = opt
  const url = loadEnv(mode, process.cwd()).VITE_BASEURL
  switch (url) {
    case 'lib': // 打包库文件，生成es + umd 格式
      return lib()
      break;
   
    default: // 开发模式、生产模式
      return project(url)
      break;
  }
}