
import { isReactive, reactive } from 'vue'
import type { InjectionKey } from 'vue'

// 加载日志类型
import type { StateLog } from '../types/type'

// 深层赋值的函数
import { deepClone } from './assign'

/**
 * 记录状态的变化日志，用key来区分
 * * stateLog = {
 * *  key: {
 * *   log: [
 * *     {
 * *       time: '时间戳',
 * *       kind: '', // 操作类型
 * *       oldValue: {},
 * *       newValue: {},
 * *       subValue: {}, // 参数
 * *       callFun: '' // 调用的函数名
 * *     }
 * *   ]
 * *  }
 * * }
 */
const stateLog = reactive<StateLog>({})

 /**
  * 添加一个新记录
  * @param key 状态的key
  * @param kind 操作类型
  * @param oldVal 原值
  * @param newVal 新值
  * @param subVal 参数，比如 patch
  * @param _stackstr stack 拆分为数组后，记录哪个元素
  */
function addLog<T> (key: string | symbol | InjectionKey<string>, kind: string, oldVal: T, newVal: T, subVal: T = {}, _stackstr?: string): void {
  if (!stateLog[key]) {
    stateLog[key] = {log: []}
  }
  if (kind === 'init') return
  
  // 获取调用者，如果没有传递的话，自己获取 $reset
  let stackstr = _stackstr
  if (!_stackstr) {
    let stackIndex = 3

    switch (kind) {
      case '$state':
        stackIndex = 5
        break
      case '$reset':
        stackIndex = 3
        break
      default:
        break
    }
    const stack: string = new Error().stack ?? ''
    const arr = stack.split('\n')
    // 记录调用的函数（组件），不支持template里触发的调用
    stackstr = arr.length > stackIndex ? arr[stackIndex]: arr[arr.length - 1]
  }

  const _oldVal: T = isReactive(oldVal) ? deepClone({}, oldVal) : oldVal
  const _newVal: T = isReactive(newVal) ? deepClone({}, newVal) : newVal
  const _subVal: T = isReactive(subVal) ? deepClone({}, subVal) : subVal

  stateLog[key].log.push({
    time: new Date().valueOf(),
    kind: kind,
    oldValue: _oldVal,
    newValue: _newVal,
    subValue: _subVal,
    callFun: stackstr // 调用的函数名
  })
}

export {
  stateLog, // 记录容器
  addLog // 添加一条记录
}