/**
 * 深层设置属性值，保留原属性，然后覆盖新属性值 options
 * @param target 目标
 * @param _source 来源
 */
export declare function deepSet<T extends object, U extends object>(target: T, _source: U): T;
/**
 * 深层拷贝，只拷贝数据，新对象
 * @param target 目标，空的
 * @param  _source 来源
 */
export declare function deepClone<T extends object, U extends object>(target: T, _source: U): T;
