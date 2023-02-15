import { Document, FolderOpened } from '@element-plus/icons-vue'
import { createRouter } from '@naturefw/ui-elp'

import home from '../views/home.vue'

// import list from '../views/data-list.vue'

// import list from '../views/plat/p02-table.vue'

const baseUrl = (document.location.host.includes('.gitee.io')) ?
  '/nf-rollup-state' :  ''

export default createRouter({
  /**
   * 基础路径
   */
  baseUrl: baseUrl,
  /**
   * 首页
   */
  home: home,

  menus: [
    {
      menuId: '1',
      title: '全局状态',
      naviId: '0',
      path: 'global',
      icon: FolderOpened,
      childrens: [
        {
          menuId: '1010',
          title: '纯state',
          path: 'state',
          icon: Document,
          component: () => import('../views/state-global/10-state.vue')
        },
        {
          menuId: '1020',
          title: '一般的状态',
          path: 'standard',
          icon: Document,
          component: () => import('../views/state-global/20-standard.vue')
        },
        {
          menuId: '1030',
          title: 'reactive',
          path: 'reactive',
          icon: Document,
          component: () => import('../views/state-global/30-reactive.vue')
        },
        {
          menuId: '1040',
          title: '日志',
          path: 'log',
          icon: Document,
          component: () => import('../views/state-global/40-log.vue')
        },
        {
          menuId: '1050',
          title: '组件里定义',
          path: 'comp-reg',
          icon: Document,
          component: () => import('../views/state-global/50-comp.vue')
        }
      ]
    },
    {
      menuId: '2000',
      title: '局部状态',
      naviId: '0',
      path: 'loacl',
      icon: FolderOpened,
      childrens: [
        {
          menuId: '2010',
          title: '父子组件',
          path: 'parent-son',
          icon: Document,
          component: () => import('../views/state-loacl/10-parent.vue')
        }
      ]
    },
    {
      menuId: '5000',
      title: '基类',
      naviId: '0',
      path: 'class',
      icon: FolderOpened,
      childrens: [
        {
          menuId: '5010',
          title: '对象',
          path: 'object',
          icon: Document,
          component: () => import('../views/state-base/10-object.vue')
        },
        {
          menuId: '5020',
          title: '数组',
          path: 'array',
          icon: Document,
          component: () => import('../views/state-base/20-array.vue')
        }
      ]
    },
    {
      menuId: '6000',
      title: '安全级别',
      naviId: '0',
      path: 'level',
      icon: FolderOpened,
      childrens: [
        {
          menuId: '6010',
          title: '宽松',
          path: 'level1',
          icon: Document,
          component: () => import('../views/state-level/10-level1.vue')
        },
        {
          menuId: '6020',
          title: '一般',
          path: 'level2',
          icon: Document,
          component: () => import('../views/state-level/20-level2.vue')
        },
        {
          menuId: '6030',
          title: '严格',
          path: 'level3',
          icon: Document,
          component: () => import('../views/state-level/30-level3.vue')
        },
        {
          menuId: '6040',
          title: '超严',
          path: 'level4',
          icon: Document,
          component: () => import('../views/state-level/40-level4.vue')
        }
      ]
    },
    {
      menuId: '8000',
      title: 'pinia',
      naviId: '0',
      path: 'pinia',
      icon: FolderOpened,
      childrens: [
        {
          menuId: '8010',
          title: '试一试',
          path: 'test',
          icon: Document,
          component: () => import('../views/pinia/pinia.vue')
        }
      ]
    }
  ]
})
