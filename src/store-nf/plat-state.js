
// 访问状态
import { defineStore } from '/nf-state'

const projectInfo = defineStore('projectInfo', {
  state: {
    ver: 1.0, // 版本信息
    projectId: '1000', // 暂时没啥用
    title: 'nf-press-edit ！',
    description: '这是一个在线编辑文档的小工具',
  },
  actions: {
    load() {
      
    }
  }
})

const naviList = defineStore('nfpress_naviList', {
  state: {
    naviList: [
      { "naviId": "1010", "text": "加载中", "link": "menu" },
      { "naviId": "1080", "text": "Gitee", "link": "https://gitee.com/nfpress/nf-press-edit" },
      { "naviId": "1090", "text": "在线演示", "link": "https://nfpress.gitee.io/nf-press-edit/" }
    ]
  },
  actions: {
    load() {
      
    }
  }
})


export {
  projectInfo,
  naviList
}