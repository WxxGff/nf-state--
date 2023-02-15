
/**
 * 测试一下
 */
export interface Person {
  isLogin: boolean,
  name: string, //
  age: number,
  info: {
    a1: string,
    b: {
      b1: string
    }
  },
  arr: [
    {
      c: {
        c1: string
      },
      d: {
        d1: string
      }
    }
  ],
  roles: Array<string>,
  test?(): void
}

/**
 * 只有 state 的状态 的测试
 */
export interface StateOnly {
  name: string
}

/**
 * 普通状态的测试
 */
 export interface StateGA {
  name: string,
  age: number,
  [key: number | string]: any
}

/**
 * 列表用的状态
 */
export interface PageList {
  moduleId: string | number, // 模块ID
  meta: any, // 列表用的各种meta：grid、pager、button、find、form
  dataList: Array<any>, // 数据列表
  findValue: any, // 查询条件的精简形式
  findArray: Array<any>, // 查询条件的对象形式
  pagerInfo: { // 分页信息
    pagerSize: number,
    count: number, // 总数
    pagerIndex: number // 当前页号
  },
  selection?: { // 列表里选择的记录
    dataId: string | number, // 单选ID number 、string
    row: any, // 单选的数据对象 {}
    dataIds: Array<any>, // 多选ID []
    rows: Array<any> // 多选的数据对象 []
  },
  query?: any, // 查询条件
  loadData? (isReset: boolean): void,

}