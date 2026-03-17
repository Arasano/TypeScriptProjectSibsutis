import { describe, it, expectTypeOf } from 'vitest';
// @ts-ignore
import { DeepReadonly, PickedByType, EventHandlers } from '../src/types';

describe('DeepReadonly', () => {
    it('делает примитивы readonly (они и так неизменяемы)', () => {
        type Input = string;
        type Result = DeepReadonly<Input>;
        expectTypeOf<Result>().toEqualTypeOf<string>();
    });

    it('делает свойства объекта readonly рекурсивно', () => {
        type Input = {
            a: number;
            b: {
                c: string;
                d: number[];
            };
        };
        type Expected = {
            readonly a: number;
            readonly b: {
                readonly c: string;
                readonly d: readonly number[];
            };
        };
        type Result = DeepReadonly<Input>;
        expectTypeOf<Result>().toEqualTypeOf<Expected>();
    });

    it('обрабатывает массивы', () => {
        type Input = { x: number }[];
        type Expected = readonly { readonly x: number }[];
        type Result = DeepReadonly<Input>;
        expectTypeOf<Result>().toEqualTypeOf<Expected>();
    });

    it('обрабатывает кортежи', () => {
        type Input = [string, number];
        type Expected = readonly [string, number];
    });
});

export type DeepReadonly<T> = T extends (infer U)[]
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T extends object
        ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
        : T;

type InputTuple = [string, number];
type ExpectedTuple = readonly [string, number];
type ResultTuple = DeepReadonly<InputTuple>;
// @ts-ignore
expectTypeOf<ResultTuple>().toEqualTypeOf<ExpectedTuple>();

describe('PickedByType', () => {
    it('выбирает свойства строкового типа', () => {
        type Input = { a: string; b: number; c: string; d: boolean };
        type Expected = { a: string; c: string };
        type Result = PickedByType<Input, string>;
        expectTypeOf<Result>().toEqualTypeOf<Expected>();
    });

    it('возвращает пустой объект, если нет свойств нужного типа', () => {
        type Input = { a: number; b: boolean };
        type Expected = {};
        type Result = PickedByType<Input, string>;
        expectTypeOf<Result>().toEqualTypeOf<Expected>();
    });

    it('работает с union типами', () => {
        type Input = { a: string | number; b: number; c: string };
        type Expected = { a: string | number; c: string };
        type Result = PickedByType<Input, string | number>;
        // @ts-ignore
        expectTypeOf<Result>().toEqualTypeOf<Expected>();
    });

    it('сохраняет опциональность', () => {
        type Input = { a?: string; b: number; c?: string };
        type Expected = { a?: string; c?: string };
        type Result = PickedByType<Input, string>;
        expectTypeOf<Result>().toEqualTypeOf<Expected>();
    });
});

describe('EventHandlers', () => {
    it('создаёт обработчики для событий', () => {
        type Events = {
            click: { x: number; y: number };
            keypress: string;
        };
        type Expected = {
            onClick: (handler: (data: { x: number; y: number }) => void) => void;
            onKeypress: (handler: (data: string) => void) => void;
        };
        type Result = EventHandlers<Events>;
        expectTypeOf<Result>().toEqualTypeOf<Expected>();
    });

    it('обрабатывает события с именами, содержащими цифры', () => {
        type Events = {
            '2fa': boolean;
        };
        type Expected = {
            on2fa: (handler: (data: boolean) => void) => void;
        };
        type Result = EventHandlers<Events>;
        expectTypeOf<Result>().toEqualTypeOf<Expected>();
    });

    it('обрабатывает пустой объект событий', () => {
        type Events = {};
        type Expected = {};
        type Result = EventHandlers<Events>;
        expectTypeOf<Result>().toEqualTypeOf<Expected>();
    });

    it('капитализирует первую букву имени события', () => {
        type Events = {
            mouseenter: undefined;
        };
        type Expected = {
            onMouseenter: (handler: (data: undefined) => void) => void;
        };
        type Result = EventHandlers<Events>;
        expectTypeOf<Result>().toEqualTypeOf<Expected>();
    });
});