export type Transform<T> = (data: T[]) => T[];

export type Where<T> = <K extends keyof T>(key: K, value: T[K]) => Transform<T>;

export type Sort<T> = <K extends keyof T>(key: K) => Transform<T>;

export type Group<T, K extends keyof T> = {
    key: T[K];
    items: T[];
};

export type Step<TArr, UArr, S extends string> = {
    stage: S;
    transform: (data: TArr) => UArr;
};

export type GroupBy<T> = <K extends keyof T>(key: K) => Transform<Group<T, K>>;

export type GroupTransform<T, K extends keyof T> = (groups: Group<T, K>[]) => Group<T, K>[];

export type Having<T> = <K extends keyof T>(predicate: (group: Group<T, K>) => boolean) => GroupTransform<T, K>;

// рекурсивный readonly для объектов и массивов
export type DeepReadonly<T> = T extends (infer U)[]
    ? readonly DeepReadonly<U>[]
    : T extends object
        ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
        : T;

// выбирает свойстива типа U из объекта T
export type PickedByType<T, U> = Pick<
    T,
    { [K in keyof T]: T[K] extends U ? K : never }[keyof T]
>;

// создаёт оббъект с методами on<Событие>(handler)
export type EventHandlers<T> = {
    [K in keyof T & string as `on${Capitalize<K>}`]: (
        handler: (data: T[K]) => void
    ) => void;
};
