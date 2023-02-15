import type { StateOption } from './types/type';
import type { InjectionKey } from 'vue';
import { BaseArray } from './main';
/**
 * 创建只有 state 的状态。
 * * 只有 state 的情况，直接使用 BaseObject 的实例
 * @param id 状态的标识
 * @param state state
 * @param options StateOption 配置选项
 * * * options：
 * * * isLocal: true - 局部；* false - 全局
 * * * level：安全等级，* 1：宽松（都行）；2：一般（不能直接改属性）；3：严格（仅action）；4：超严（指定组件）
 * * * isLog：true - 做记录； * false - 不用做记录
 * @returns
 */
export default function stateOnly(id: string | symbol | InjectionKey<string>, state: any, options?: StateOption): {
    [x: number]: any;
    readonly $id: string | symbol | {
        toString: () => string;
        valueOf: () => symbol;
        readonly description: string | undefined;
        [Symbol.toPrimitive]: (hint: string) => symbol;
        readonly [Symbol.toStringTag]: string;
    };
    readonly $isLog: boolean;
    readonly $_value: any;
    $reset: () => void;
    $patch: () => void;
    $toRaw: <T>() => T[];
    $state: any;
    $forEach: () => void;
    readonly $log: any;
    $clearLog: () => void;
    pushA: (...arg: any[]) => number;
    pushAt: (i: number, ...arg: any[]) => void;
    deleteA: () => void;
    deleteAt: (i: number, n: number) => any[];
    deleteZ: () => void;
    swap: (i1: number, i2: number) => void;
    length: number;
    toString: () => string;
    toLocaleString: () => string;
    pop: () => any;
    push: (...items: any[]) => number;
    concat: {
        (...items: ConcatArray<any>[]): any[];
        (...items: any[]): any[];
    };
    join: (separator?: string | undefined) => string;
    reverse: () => any[];
    shift: () => any;
    slice: (start?: number | undefined, end?: number | undefined) => any[];
    sort: (compareFn?: ((a: any, b: any) => number) | undefined) => BaseArray;
    splice: {
        (start: number, deleteCount?: number | undefined): any[];
        (start: number, deleteCount: number, ...items: any[]): any[];
    };
    unshift: (...items: any[]) => number;
    indexOf: (searchElement: any, fromIndex?: number | undefined) => number;
    lastIndexOf: (searchElement: any, fromIndex?: number | undefined) => number;
    every: {
        <S extends any>(predicate: (value: any, index: number, array: any[]) => value is S, thisArg?: any): this is S[];
        (predicate: (value: any, index: number, array: any[]) => unknown, thisArg?: any): boolean;
    };
    some: (predicate: (value: any, index: number, array: any[]) => unknown, thisArg?: any) => boolean;
    forEach: (callbackfn: (value: any, index: number, array: any[]) => void, thisArg?: any) => void;
    map: <U>(callbackfn: (value: any, index: number, array: any[]) => U, thisArg?: any) => U[];
    filter: {
        <S_1 extends any>(predicate: (value: any, index: number, array: any[]) => value is S_1, thisArg?: any): S_1[];
        (predicate: (value: any, index: number, array: any[]) => unknown, thisArg?: any): any[];
    };
    reduce: {
        (callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any): any;
        (callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any, initialValue: any): any;
        <U_1>(callbackfn: (previousValue: U_1, currentValue: any, currentIndex: number, array: any[]) => U_1, initialValue: U_1): U_1;
    };
    reduceRight: {
        (callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any): any;
        (callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: any[]) => any, initialValue: any): any;
        <U_2>(callbackfn: (previousValue: U_2, currentValue: any, currentIndex: number, array: any[]) => U_2, initialValue: U_2): U_2;
    };
    find: {
        <S_2 extends any>(predicate: (this: void, value: any, index: number, obj: any[]) => value is S_2, thisArg?: any): S_2 | undefined;
        (predicate: (value: any, index: number, obj: any[]) => unknown, thisArg?: any): any;
    };
    findIndex: (predicate: (value: any, index: number, obj: any[]) => unknown, thisArg?: any) => number;
    fill: (value: any, start?: number | undefined, end?: number | undefined) => BaseArray;
    copyWithin: (target: number, start: number, end?: number | undefined) => BaseArray;
    entries: () => IterableIterator<[number, any]>;
    keys: () => IterableIterator<number>;
    values: () => IterableIterator<any>;
    includes: (searchElement: any, fromIndex?: number | undefined) => boolean;
    flatMap: <U_3, This = undefined>(callback: (this: This, value: any, index: number, array: any[]) => U_3 | readonly U_3[], thisArg?: This | undefined) => U_3[];
    flat: <A, D extends number = 1>(this: A, depth?: D | undefined) => FlatArray<A, D>[];
    at: (index: number) => any;
    [Symbol.iterator]: () => IterableIterator<any>;
    [Symbol.unscopables]: () => {
        copyWithin: boolean;
        entries: boolean;
        fill: boolean;
        find: boolean;
        findIndex: boolean;
        keys: boolean;
        values: boolean;
    };
} | {
    readonly $id: string | symbol | {
        toString: () => string;
        valueOf: () => symbol;
        readonly description: string | undefined;
        [Symbol.toPrimitive]: (hint: string) => symbol;
        readonly [Symbol.toStringTag]: string;
    };
    readonly $isLog: boolean;
    readonly $_value: any;
    $reset: () => void;
    $patch: (_val: any) => void;
    $toRaw: <T_1>() => T_1;
    $state: any;
    $forEach: (cb: (obj: any, key: string, index: number) => void) => void;
    readonly $log: any;
    $clearLog: () => void;
};
