import type { InjectionKey } from 'vue';
/**
 * 记录状态的变化日志，用key来区分
 * * stateLog = {
 * *  key: {
 * *   log: [
 * *     {
 * *       time: '时间戳',
 * *       kind: '', // 操作类型
 * *       oldValue: {},
 * *       newValue: {},
 * *       subValue: {}, // 参数
 * *       callFun: '' // 调用的函数名
 * *     }
 * *   ]
 * *  }
 * * }
 */
declare const stateLog: {
    [x: string]: {
        log: {
            time: number;
            time2?: string | undefined;
            kind: string;
            oldValue: any;
            newValue: any;
            subValue: any;
            callFun: string;
        }[];
    };
    [x: symbol]: {
        log: import("../types/type").StateLogInfo[];
    };
};
/**
 * 添加一个新记录
 * @param key 状态的key
 * @param kind 操作类型
 * @param oldVal 原值
 * @param newVal 新值
 * @param subVal 参数，比如 patch
 * @param _stackstr stack 拆分为数组后，记录哪个元素
 */
declare function addLog<T>(key: string | symbol | InjectionKey<string>, kind: string, oldVal: T, newVal: T, subVal?: T, _stackstr?: string): void;
export { stateLog, // 记录容器
addLog };
