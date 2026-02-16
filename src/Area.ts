export function calculateArea(shape: 'circle', radius: number): number;
export function calculateArea(shape: 'square', side: number): number;

export function calculateArea(shape: 'circle' | 'square', value: number): number {
    if (shape === 'circle') {
        return Math.PI * value * value;
    } else {
        return value * value;
    }
}
