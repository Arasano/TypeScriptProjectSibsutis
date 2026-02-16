interface HasId {
    id: number;
}

function findById<T extends HasId>(
    items: T[],
    id: number
): T | undefined {
    return items.find(item => item.id === id);
}

const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

findById(users, 2);
