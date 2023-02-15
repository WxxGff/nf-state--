import type { IState } from '../../../lib/types/type';
import type { PageList } from '../../types/typs';
/**
 * 注册局部状态，父组件使用 provide
 * * 数据列表用
 * @returns
 */
declare const regListState: () => PageList & IState;
/**
 * 子组件用 inject 获取状态
 * @returns
 */
declare const getListState: () => PageList & IState;
export { getListState, regListState };
