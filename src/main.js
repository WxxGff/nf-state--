import { createApp } from 'vue'
import App from './App.vue'

import store from './store-nf'

import { createPinia } from 'pinia'

// indexedDB 数据库
import indexedDBHelp from './store-nf/plat-mate.js'
// 状态
import {
  projectInfo,
  naviList
} from './store-nf/plat-state.js'

// indexedDB 数据库
indexedDBHelp()


function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
// give the plugin to pinia
pinia.use(SecretPiniaPlugin)

// in another file
// const store = useStore()
// counter.secret // 'the cake is a lie'

pinia.use((parm) => {
  // console.log('pinia的插件 - .use')
  console.log(parm.store.$id)
  parm.store.$subscribe((val) => {
    console.log('\n pinia的插件 - subscribe========================')
    console.log(val.storeId, val.events)

    // react to store changes
  })
  parm.store.$onAction((val) => {
    console.log('pinia的插件 - onAction', val)
    // react to store actions
  })
})

createApp(App)
  .use(store)
  .use(pinia)
  .mount('#app')
