/**
 * 帮助文档的数据库，存放项目、导航、菜单、文档信息。
 */

import { useStore } from '/nf-state'

// 创建help
import { dbCreateHelp } from '@naturefw/storage'
// 访问后端
// import axios from 'axios'

// 设置数据库名称和版本
const db = {
  dbName: 'nf-state-test-01',
  ver: 1
}

/**
 * 获取项目信息，包含导航信息
 * 存入状态
 * 获取菜单信息，存入状态
 * 
 */
const dataSetup = async (help) => {
  // const current = state.current

  const { projectInfo } = useStore()

  console.log('projectInfo', projectInfo)
   
}

/**
 * 客户项目的 meta 的 db 缓存
 */
export default async function createDBHelp (callback) {

  const help = dbCreateHelp({
    // dbFlag: 'project-meta-db',
    dbConfig: db,
    stores: { // 数据库里的对象仓库
      project: { // 可以存放多个项目的文档，包含导航信息和项目信息
        id: 'projectId',
        index: {},
        isClear: false
        /**
         * 属性：
         * projectId: '项目ID',
         * ver: '版本号',
         * title: '网站标题',
         * description: '网站描述',
         * navi: [ // 网站导航
         *   {
         *     naviId: '导航项ID',
         *     text: '导航项名称',
         *     link: 'menu' // 连接。menu: 对应菜单；其他：对应连接
         *   }
         * ]
         */
      },
      menu: { // 文档的菜单，一个导航项，对应一个菜单
        id: 'naviId',
        isClear: false
        /**
         * 属性：
         * naviId: '导航项ID',
         * menus: [
         *   menuId: '菜单项ID',
         *   ver: '版本号'
         *   lastTime: 123, // 时间戳，对应文档的最后修改时间
         *   text: '菜单项名称',
         *   description: '菜单项描述',
         *   link: '路径和文件名', // 暂时不使用
         *   icon: '图标名称',
         *   children: [] // 子菜单项，可以 n 级
         * ]
         */
      },
      doc: { // 帮助文档，一个菜单项只能对应一个文档
        id: 'docId',
        isClear: false
        /**
         * 属性：
         * docId: '菜单项ID',
         * ver: '版本号'
         * lastTime: 123, // 时间戳，对应文档的最后修改时间
         * md: 'markdown格式的文档',
         * code: [ // 可以运行的代码
         *   {
         *     js: 'setup函数',
         *     template: '模板里的代码',
         *     style: '样式'
         *   }
         * ],
         * comp: [ // 加载的组件，可以运行
         *   {}
         * ]
         */
      }
    },
    // 设置初始数据
    async init (help) {
      // config.help = help

      if (typeof callback === 'function') {
        await callback(help)
      }
      await dataSetup(help)
    }
  })
  return help
}
