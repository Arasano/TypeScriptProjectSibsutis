import { describe, it, expect, expectTypeOf  } from 'vitest';
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

describe('query pipeline with order enforcement', () => {
    it('valid: where then sort', () => {
        const q = query<User>(
            where("name", "John"),
            sort("age")
        );
        const result = q(users);
        expect(result).toEqual([
            { id: 2, name: "John", surname: "Doe", age: 33, city: "NY" },
            { id: 1, name: "John", surname: "Doe", age: 34, city: "NY" },
            { id: 3, name: "John", surname: "Doe", age: 35, city: "LA" },
        ]);
        expectTypeOf(result).toEqualTypeOf<User[]>();
    });

    it('valid: groupBy, having, sort', () => {
        const q = query<User>(
            groupBy("city"),
            having((g) => g.items.length > 1),
            sort("key")
        );
        const result = q(users);
        expect(result).toEqual([
            { key: "LA", items: [users[2], users[3]] },
            { key: "NY", items: [users[0], users[1]] },
        ]);
        expectTypeOf(result).toEqualTypeOf<Array<{ key: string; items: User[] }>>();
    });

    it('valid: only where', () => {
        const q = query<User>(where("city", "NY"));
        expect(q(users)).toEqual([users[0], users[1]]);
    });

    it('valid: only sort', () => {
        const q = query<User>(sort("age"));
        expect(q(users)).toEqual([users[1], users[0], users[2], users[3]]);
    });

    it('valid: where, groupBy, having', () => {
        const q = query<User>(
            where("surname", "Doe"),
            groupBy("city"),
            having((g) => g.items.some(u => u.age > 34))
        );
        const result = q(users);
        expect(result).toEqual([{ key: "LA", items: [users[2], users[3]] }]);
    });

    it('valid: empty steps', () => {
        const q = query<User>();
        expect(q(users)).toEqual(users);
    });

    // Проверки типов (негативные)
    it('invalid: having without group', () => {
        // @ts-expect-error
        const q = query<User>(having((g) => true));
    });

    it('invalid: group then sort (missing having)', () => {
        // @ts-expect-error
        const q = query<User>(groupBy("city"), sort("key"));
    });

    it('invalid: sort after group before having', () => {
        // @ts-expect-error
        const q = query<User>(groupBy("city"), sort("key"), having((g) => true));
    });

    it('invalid: group after having', () => {
        // @ts-expect-error
        const q = query<User>(groupBy("city"), having((g) => true), groupBy("age"));
    });

    it('invalid: where after group', () => {
        // @ts-expect-error
        const q = query<User>(groupBy("city"), where("name", "John"));
    });

    it('invalid: having after sort', () => {
        // @ts-expect-error
        const q = query<User>(sort("age"), having((g) => true));
    });

    it('invalid: where after sort', () => {
        // @ts-expect-error
        const q = query<User>(sort("age"), where("name", "John"));
    });
});