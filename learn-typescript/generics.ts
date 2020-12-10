function echo<T>(arg: T): T {
    return arg
}

const result1: string = echo('123')
const result: number = echo(123)

function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}

const result3 = swap([123, '456'])
