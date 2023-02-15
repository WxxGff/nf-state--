import type { InjectionKey } from 'vue';
import type { IState } from '../../../lib/types/type';
import type { StateGA } from '../../types/typs';
declare const flag: InjectionKey<string>;
declare const globalTest: () => StateGA & IState;
export { flag, globalTest };
