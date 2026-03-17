import {Transform, Group, GroupTransform} from './types';

export function where<T, K extends keyof T>(key: K, value: T[K]): Transform<T> {
    return (data) => data.filter(item => item[key] === value);
}

export function sort<T, K extends keyof T>(key: K): Transform<T> {
    return (data) => [...data].sort((a, b) => {
        const av = a[key];
        const bv = b[key];
        if (av < bv) return -1;
        if (av > bv) return 1;
        return 0;
    });
}

export function groupBy<T, K extends keyof T>(key: K): Transform<Group<T, K>> {
    return (data) => {
        const groupsMap = new Map<T[K], T[]>();
        for (const item of data) {
            // @ts-ignore
            const groupKey = item[key];
            if (!groupsMap.has(groupKey)) {
                groupsMap.set(groupKey, []);
            }
            // @ts-ignore
            groupsMap.get(groupKey)!.push(item);
        }
        return Array.from(groupsMap.entries()).map(([k, items]) => ({ key: k, items }));
    };
}

export function having<T, K extends keyof T>(
    predicate: (group: Group<T, K>) => boolean
): GroupTransform<T, K> {
    return (groups) => groups.filter(predicate);
}