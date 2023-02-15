import type { InjectionKey } from 'vue';
import type { IState } from '../types/type';
/**
 * 继承 Array，做一个子类 implements IState
 */
export default class BaseArray extends Array implements IState {
    get $id(): string | symbol | InjectionKey<string>;
    get $isLog(): boolean;
    get $_value(): any;
    constructor(_info?: any);
    /**
     * 获取初始值
     */
    /**
     * 恢复初始值
     */
    $reset(): void;
    /**
     * 没有实现功能，仅兼容 对象基类的方法
     */
    $patch(): void;
    /**
     * 取原型，不包含内部方法
     */
    $toRaw<T>(): Array<T>;
    /**
     * 整体替换，会清空原数组，
     */
    set $state(value: any);
    /**
     * 给 object 加一个 forEach 的方法
     */
    $forEach(): void;
    /**
     * 获取日志
     */
    get $log(): any;
    /**
     * 清空日志
     */
    $clearLog(): void;
    /**
     * 在开头添加，封装 unshift
     * @returns 返回新数组的长度
     */
    pushA(...arg: Array<any>): number;
    /**
     * 在指定位置i开始添加新元素，封装 splice
     * @param i 从 0 开始的位置
     * @param val 要添加的新元素
     * @returns 返回新数组的长度
     */
    pushAt(i: number, ...arg: Array<any>): void;
    /**
     * 删除第一个元素
     * @returns 返回被删除的元素
     */
    deleteA(): void;
    /**
     * 删除从指定位置 i 开始的 n 个元素
     * @param i 从 0 开始的位置
     * @param n 删除多少个元素
     * @returns 返回被删除的元素
     */
    deleteAt(i: number, n: number): any[];
    /**
     * 删除最后一个元素
     * @returns 返回被删除的元素
     */
    deleteZ(): void;
    /**
     * 交换两个数组元素的位置
     * @param i1 数组下标
     * @param i2 数组下标
     */
    swap(i1: number, i2: number): void;
}
