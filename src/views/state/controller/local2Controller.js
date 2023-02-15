import { reactive, provide, inject } from 'vue'

const flag = 'test2'


/**
 * 注入局部状态
 */
const reg = () => {
  const _test = reactive({
    name: '局部状态的对象形式的controller'
  })

  provide(flag, _test)
  return _test
}

/**
 * 获取注入的状态
 */
const get = () => {
  const re = inject(flag)
  return re
}

const regTrack = () => {
  const ret = reactive({
    name: '局部状态的可跟踪状态'
  })
  const logTrack = reactive([])

  const watchSet = (res) => {
    console.log(res)
    console.log(res.stack)
    console.log(logTrack)
  }
  const loaclTrack = ''// trackReactive(ret, 'loaclTrack', logTrack, watchSet)

  return {
    loaclTrack,
    logTrack,
    watchSet
  }
}

// 其他操作

export {
  regTrack,
  reg,
  get,
}
