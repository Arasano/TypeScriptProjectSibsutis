// pipeline.test.ts
import { describe, it, expect } from 'vitest';
import { where, sort, groupBy, having } from '../src/pipeline';
import { query } from '../src/query';

type User = {
    id: number;
    name: string;
    surname: string;
    age: number;
    city: string;
};

const users: User[] = [
    { id: 1, name: "John", surname: "Doe", age: 34, city: "NY" },
    { id: 2, name: "John", surname: "Doe", age: 33, city: "NY" },
    { id: 3, name: "John", surname: "Doe", age: 35, city: "LA" },
    { id: 4, name: "Mike", surname: "Doe", age: 35, city: "LA" },
];

describe('query pipeline', () => {
    it('фильтрация и сортировка', () => {
        // @ts-ignore
        const search = query<User>(
            where("name", "John"),
            where("surname", "Doe"),
            sort("age")
        );
        const result = search(users);
        expect(result).toEqual([
            { id: 2, name: "John", surname: "Doe", age: 33, city: "NY" },
            { id: 1, name: "John", surname: "Doe", age: 34, city: "NY" },
            { id: 3, name: "John", surname: "Doe", age: 35, city: "LA" },
        ]);
    });

    it('группировка и фильтр групп', () => {
        // @ts-ignore
        const groupAndFilter = query<User>(
            groupBy("city"),
            having((group) => group.items.length > 1)
        );
        const result = groupAndFilter(users);
        expect(result).toEqual([
            { key: "NY", items: [users[0], users[1]] },
            { key: "LA", items: [users[2], users[3]] },
        ]);
    });

    it('комбинированный конвейер', () => {
        // @ts-ignore
        const pipeline = query<User>(
            where("surname", "Doe"),
            groupBy("city"),
            having((group) => group.items.some((u) => u.age > 34))
        );
        const result = pipeline(users);
        expect(result).toEqual([
            { key: "LA", items: [users[2], users[3]] }
        ]);
    });

    it('обработка пустого массива', () => {
        // @ts-ignore
        const search = query<User>(where("name", "John"));
        expect(search([])).toEqual([]);
    });

    it('несовместимые шаги вызывают ошибку компиляции', () => {
        // @ts-expect-error - groupBy возвращает группы, а where ожидает User[]
        // const invalid = query<User>(groupBy("city"), where("name", "John"));
    });
});