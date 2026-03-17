import { Transform } from './types';

type LastReturnType<T extends any[]> = T extends [...any[], infer Last]
    ? Last extends (...args: any) => infer R
        ? R
        : never
    : never;

type CheckSteps<T, Steps extends any[]> = Steps extends []
    ? true
    : Steps extends [infer First, ...infer Rest]
        ? First extends (data: T[]) => infer R
            ? CheckSteps<R, Rest>
            : false
        : false;

export function query<T, Steps extends any[]>(
    ...steps: Steps & (CheckSteps<T, Steps> extends true ? Steps : never)
): (data: T[]) => LastReturnType<Steps> {
    return (data: T[]) => {
        let result: any = data;
        for (const step of steps) {
            result = step(result);
        }
        return result as LastReturnType<Steps>;
    };
}