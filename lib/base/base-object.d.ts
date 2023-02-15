import type { InjectionKey } from 'vue';
import type { IState } from '../types/type';
/**
 * 对象的状态的基类，提供基础功能 implements IState
 * * $state = {...} 整体赋值
 * * $patch({...}) 修改部分属性
 * * $reset() 恢复初始值
 */
export default class BaseObject implements IState {
    get $id(): string | symbol | InjectionKey<string>;
    get $isLog(): boolean;
    get $_value(): any;
    constructor(_info: any);
    /**
     * 获取初始值，需要子类实现
     */
    /**
     * 恢复初始值
     */
    $reset(): void;
    /**
     * 替换部分属性，支持深层
     */
    $patch(_val: any): void;
    /**
     * 取原型，不包含内部方法
     */
    $toRaw<T>(): T;
    /**
     * 整体替换，会删除原有属性
     */
    set $state(value: any);
    /**
     * 给 object 加一个 forEach 的方法
     * @param cb 回调函数
     */
    $forEach(cb: (obj: any, key: string, index: number) => void): void;
    /**
     * 获取日志
     */
    get $log(): any;
    /**
     * 清空日志
     */
    $clearLog(): void;
}
