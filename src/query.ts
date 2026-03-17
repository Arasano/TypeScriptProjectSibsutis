import { Step } from './types';

// Извлечение стадии из шага
type StageOf<S> = S extends Step<any, any, infer St> ? St : never;

// Проверка порядка стадий
type CheckStages<Stages extends string[], State extends string = 'beforeGroup'> =
    Stages extends [] ? Stages :
        Stages extends [infer First, ...infer Rest] ?
            First extends string ?
                (State extends 'beforeGroup' ?
                    (First extends 'where' ? CheckStages<Rest, 'beforeGroup'> :
                        First extends 'group' ? CheckStages<Rest, 'afterGroup'> :
                            First extends 'sort' ? CheckStages<Rest, 'afterSort'> :
                                never) :
                    State extends 'afterGroup' ?
                        (First extends 'having' ? CheckStages<Rest, 'afterHaving'> :
                            never) :
                        State extends 'afterHaving' ?
                            (First extends 'sort' ? CheckStages<Rest, 'afterSort'> :
                                never) :
                            State extends 'afterSort' ?
                                (First extends 'sort' ? CheckStages<Rest, 'afterSort'> :
                                    never) :
                                never) :
                never :
            Stages;

// Проверка совместимости типов между шагами
type ValidateTypes<T, Steps extends any[], Current = T> =
    Steps extends [] ? Steps :
        Steps extends [infer First, ...infer Rest] ?
            First extends Step<infer In, infer Out, any> ?
                Current extends In ?
                    [First, ...ValidateTypes<Out, Rest, Out>] :
                    never :
                never :
            never;

// Объединённая проверка: порядок и типы
type ValidSteps<T, Steps extends any[]> =
    CheckStages<{ [I in keyof Steps]: StageOf<Steps[I]> }> extends never ? never :
        ValidateTypes<T, Steps> extends Steps ? Steps : never;

// Определение выходного типа последнего шага
type LastStepType<T, Steps extends any[]> = Steps extends [] ? T[] :
    Steps extends [...any[], infer Last] ?
        Last extends Step<any, infer Out, any> ? Out : never : never;

export function query<T, Steps extends any[]>(
    ...steps: Steps & ValidSteps<T[], Steps>
): (data: T[]) => LastStepType<T[], Steps> {
    return (data: T[]) => {
        let current: any = data;
        for (const step of steps) {
            current = step.transform(current);
        }
        return current as LastStepType<T[], Steps>;
    };
}