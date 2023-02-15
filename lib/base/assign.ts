
import { toRaw } from "vue"
import BaseArray from "./base-array"

/**
 * 深层设置属性值，保留原属性，然后覆盖新属性值 options
 * @param target 目标
 * @param _source 来源
 */
export function deepSet<T extends object, U extends object> (target: T, _source: U) {
  // 取原型
  const source = (_source.$toRaw) ? _source.$toRaw() : toRaw(_source)
  // 遍历原，判断属性类型
  Object.keys(source).forEach(key => {
    switch(typeof source[key]) {
      case 'object' :
        if (Array.isArray(source[key])) {
          // 数组
          if (Array.isArray(target[key])) {
            target[key].length = 0
          } else {
            target[key] = new BaseArray()
          }
          target[key].push(...source[key])
        } else {
          if (!target[key]) { // 没有定义
            target[key] = {}
          }
          if (source[key] === null) {
            target[key] = null
          } else {
            deepSet(target[key], source[key])
          }
        }
        break
      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
        target[key] = source[key]
        break      
      default:
        // 不拷贝
        break
    }
  })
  return target
}

/**
 * 深层拷贝，只拷贝数据，新对象
 * @param target 目标，空的
 * @param  _source 来源
 */
export function deepClone<T extends object, U extends object> (target: T, _source: U) {
  // 取原型
  const source = (_source.$toRaw) ? _source.$toRaw() : toRaw(_source)
  // 遍历原，判断属性类型
  Object.keys(source).forEach(key => {
    switch(typeof source[key]) {
      case 'object' :
        if (Array.isArray(source[key])) {
          // 数组，使用扩展的子类
          target[key] = new BaseArray(source[key])
          // target[key] = []
          // target[key].push(...source[key])
        } else {
          target[key] = {}
          deepClone(target[key], source[key])
        }
        break
      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
        target[key] = source[key]
        break      
      default:
        // 不拷贝
        break
    }
  })
  return target
}
 