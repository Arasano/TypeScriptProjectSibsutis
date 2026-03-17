import {Transform, Group, GroupTransform, Step} from './types';

export function where<T, K extends keyof T>(key: K, value: T[K]): Step<T[], T[], 'where'> {
    return {
        stage: 'where',
        transform: (data: T[]) => data.filter(item => item[key] === value)
    };
}


export function sort<A extends any[], K extends keyof A[0]>(key: K): Step<A, A, 'sort'> {
    return {
        stage: 'sort',
        transform: (data: A) => {
            return [...data].sort((a, b) => {
                const av = a[key];
                const bv = b[key];
                if (av < bv) return -1;
                if (av > bv) return 1;
                return 0;
            }) as A;
        }
    };
}

export function groupBy<T, K extends keyof T>(key: K): Step<T[], Group<T, K>[], 'group'> {
    return {
        stage: 'group',
        transform: (data: T[]) => {
            const groupsMap = new Map<T[K], T[]>();
            for (const item of data) {
                const groupKey = item[key];
                if (!groupsMap.has(groupKey)) {
                    groupsMap.set(groupKey, []);
                }
                groupsMap.get(groupKey)!.push(item);
            }
            return Array.from(groupsMap.entries()).map(([k, items]) => ({ key: k, items }));
        }
    };
}

export function having<T, K extends keyof T>(
    predicate: (group: Group<T, K>) => boolean
): Step<Group<T, K>[], Group<T, K>[], 'having'> {
    return {
        stage: 'having',
        transform: (groups: Group<T, K>[]) => groups.filter(predicate)
    };
}


