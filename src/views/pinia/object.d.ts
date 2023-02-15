interface Person {
    isLogin: boolean;
    name: string;
    age: number;
    roles: Array<string>;
}
export declare const usePersonStore: import("pinia").StoreDefinition<"objectTest", Person, {
    ageTest(state: {
        isLogin: boolean;
        name: string;
        age: number;
        roles: Array<string>;
    } & {}): number;
}, {
    nameAction(): void;
}>;
export {};
