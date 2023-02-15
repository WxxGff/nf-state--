/**
 * 测试一下
 */
export interface Person {
    isLogin: boolean;
    name: string;
    age: number;
    info: {
        a1: string;
        b: {
            b1: string;
        };
    };
    arr: [
        {
            c: {
                c1: string;
            };
            d: {
                d1: string;
            };
        }
    ];
    roles: Array<string>;
    test?(): void;
}
/**
 * 只有 state 的状态 的测试
 */
export interface StateOnly {
    name: string;
}
/**
 * 普通状态的测试
 */
export interface StateGA {
    name: string;
    age: number;
    [key: number | string]: any;
}
/**
 * 列表用的状态
 */
export interface PageList {
    moduleId: string | number;
    meta: any;
    dataList: Array<any>;
    findValue: any;
    findArray: Array<any>;
    pagerInfo: {
        pagerSize: number;
        count: number;
        pagerIndex: number;
    };
    selection?: {
        dataId: string | number;
        row: any;
        dataIds: Array<any>;
        rows: Array<any>;
    };
    query?: any;
    loadData?(isReset: boolean): void;
}
