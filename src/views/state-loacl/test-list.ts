import type { InjectionKey } from 'vue'
import { watch } from 'vue'

import { defineStore, useStoreLocal } from '../../../lib/main'
import type { IState } from '../../../lib/types/type'

import type { PageList } from '../../types/typs'

const flag = Symbol('pager') as InjectionKey<string>

/**
 * 注册局部状态，父组件使用 provide
 * * 数据列表用
 * @returns
 */
const regListState = (): PageList & IState => {
  // 定义 列表用的状态
  const state = defineStore<PageList>(flag, {
    state: (): PageList => {
      return {
        moduleId: 0, // 模块ID
        meta: {}, // 列表用的各种meta：grid、pager、button、find、form
        dataList: [], // 数据列表
        findValue: {}, // 查询条件的精简形式
        findArray: [], // 查询条件的对象形式
        pagerInfo: { // 分页信息
          pagerSize: 5,
          count: 20, // 总数
          pagerIndex: 1 // 当前页号
        },
        selection: { // 列表里选择的记录
          dataId: '', // 单选ID number 、string
          row: {}, // 单选的数据对象 {}
          dataIds: [], // 多选ID []
          rows: [] // 多选的数据对象 []
        },
        query: {} // 查询条件
      }
    },
    getters: {
    },
    actions: {
      /**
       * 加载数据，
       * @param {*} isReset true：设置总数，页号设置为1；false：仅翻页
       */
      async loadData (isReset = false) {
        
        const list = {
          allCount: 10,
          dataList: [{
            name: '数据测试' + new Date().valueOf()
          }]
        }
        // 使用 $state 直接赋值
        this.dataList.$state = list.dataList
        if (isReset) {
          this.pagerInfo.count = list.allCount === 0 ? 1 : list.allCount
          this.pagerInfo.pagerIndex = 1
        }
      }
    }
  },
  { isLocal: true }
  )

  // 初始化
  state.loadData(true)

  // 监听页号，实现翻页功能
  watch(() => state.pagerInfo.pagerIndex, () => {
    state.loadData()
  })

  // 监听查询条件，实现查询功能。
  watch(state.findValue, () => {
    state.loadData(true)
  })

  return state
}

/**
 * 子组件用 inject 获取状态
 * @returns
 */
const getListState = (): PageList & IState => {
  return useStoreLocal<PageList & IState>(flag)
}

export {
  getListState,
  regListState
}
