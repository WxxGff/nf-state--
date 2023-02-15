import { reactive, provide, inject } from 'vue'

export default function localController() {
  const flag = 'test'

  /**
   * 注入局部状态
   */
  const reg = () => {
    const _test = reactive({
      name: '局部状态'
    })

    provide(flag, _test)
    return _test
  }

  /**
   * 获取注入的状态
   * @returns 
   */
  const get = () => {
    const re = inject(flag)
    return re
  }

  // 其他操作

  return {
    reg,
    get
  }
}