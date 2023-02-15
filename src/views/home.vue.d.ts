import type { InjectionKey } from 'vue';
interface IState {
    get $id(): string | symbol | InjectionKey<string>;
    set $state(value: any);
    [key: string | number]: any;
}
declare class BaseArray extends Array implements IState {
    get $id(): string | symbol | InjectionKey<string>;
    constructor(_info?: any);
    set $state(value: any);
}
declare const _default: import("vue").DefineComponent<{}, {
    myclick: () => void;
    state: {
        readonly $id: string | symbol | {
            toString: () => string;
            valueOf: () => symbol;
            readonly description: string | undefined;
            [Symbol.toPrimitive]: (hint: string) => symbol;
            readonly [Symbol.toStringTag]: string;
        };
        name: string;
        age: number;
        readonly name2: string;
        $state: any;
    };
    myclick2: () => void;
    state2: {
        [x: number]: any;
        readonly $id: string | symbol | {
            toString: () => string;
            valueOf: () => symbol;
            readonly description: string | undefined;
            [Symbol.toPrimitive]: (hint: string) => symbol;
            readonly [Symbol.toStringTag]: string;
        };
        $state: any;
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
    };
    myclick3: () => void;
    state3: {
        readonly $id: string;
        name: string;
        age: number;
        readonly name2: string;
        $state: any;
    };
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
export default _default;
