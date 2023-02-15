import { createApp } from 'vue'
import App from './App.vue'

import store from './store-nf/state'

import { createPinia } from 'pinia'

const pinia = createPinia()

// 简易路由
import router from './router'

// UI库
import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
// import 'dayjs/locale/zh-cn'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 二次封装
import { nfElementPlus } from '@naturefw/ui-elp'

createApp(App)
  .use(router)
  .use(ElementPlus, { locale: zhCn, size: 'small' }) // UI库
  .use(nfElementPlus) // 二次封装的组件
  .use(store)
  .use(pinia)
  .mount('#app')
