export interface HasId {
    id: number;
}

export function findById<T extends HasId>(
    items: T[],
    id: number
): T | undefined {
    return items.find((item: { id: number; }) => item.id === id);
}

export const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

findById(users, 2);
