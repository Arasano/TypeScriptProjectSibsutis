interface User {
    id: number;
    name: string;
    email?: string;    // ? означает, что поле НЕобяз
    isActive: boolean;
}

function createUser(
    id: number,
    name: string,
    email?: string,
    isActive: boolean = true // = true означает "значение по умолчанию"
): User {
    return {
        id,
        name,
        email,
        isActive,
    };
}
