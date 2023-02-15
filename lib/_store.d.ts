import type { InjectionKey } from 'vue';
import type { StateOption, IState, Store, StateCreateListOption, StateCreateOption } from './types/type';
export declare const store: Store;
/**
 * 单独定义状态，可以是全局状态，也可以是局部状态
 * @param id 标识（string | symbol），全局状态不能重名；局部状态可以重名。
 * @param info StateCreateOption 状态描述：state、getter、action，或者 reactive、readonly
 * * info：
 * * 一：reactive、readonly，直接存入状态
 * * 二：含有getter或则action -- 使用子类的实例
 * * 三：对象（无state属性）--直接视为 state，不设置 getter 和 action
 * * 四：只有state属性，-- 使用基类的实例，同上
 * @param options StateOption 配置选项
 * * options：
 * * * isLocal: true - 局部；* false - 全局
 * * * level：number，安全等级，
 * * * * 1：宽松（都行）；
 * * * * 2：一般（不能直接改属性）；
 * * * * 3：严格（仅action）；
 * * * * 4：超严（指定组件）
 * * * isLog：true - 做记录； * false - 不用做记录
 */
export declare function defineStore<T>(id: string | symbol | InjectionKey<string>, info: StateCreateOption | any, options?: StateOption): T & IState;
/**
 * 创建全局状态。
 * @param info 状态列表，多个状态
 */
export declare function createStore(info: StateCreateListOption): (app: any) => void;
/**
 * 获取全局状态。implements IState
 * @param id 全局状态 的 ID，string | symbol
 * @returns 指定的状态
 */
export declare function useStore<T>(id: string | symbol | InjectionKey<string>): T & IState;
/**
 * 获取局部状态
 * @param id 状态的ID
 * @returns 局部状态
 */
export declare function useStoreLocal<T>(id: string | symbol | InjectionKey<string>): T & IState;
