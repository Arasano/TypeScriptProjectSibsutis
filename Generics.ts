function getFirstElement<T>(arr: T[]): T | undefined {
    return arr.length > 0 ? arr[0] : undefined;
}

getFirstElement([1, 2, 3]);        // T станет number
getFirstElement(["a", "b"]);       // T станет string