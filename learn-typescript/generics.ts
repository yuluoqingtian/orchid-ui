function echo<T>(arg: T): T {
    return arg
}

const result1: string = echo('123')
const result: number = echo(123)

function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}

const result3 = swap([123, '456'])

interface IWithLength {
    length: number;
}

function echoWithArray<T>(arg: T[]): T[] {
    console.log(arg.length);
    return arg
}

function echoWithLength<T extends IWithLength>(arg: T): T {
    console.log(arg.length);
    return arg
}

const str = echoWithLength('123')
const obj = echoWithLength({ length: 10, width: 10 })
const result5 = echoWithLength([123, 456])

const result4 = echoWithArray([1, 2, '1324'])


class Queue<T> {
    private data = []
    public push(item: T) {
        return this.data.push(item)
    }
    public pop(): T {
        return this.data.shift()
    }
}

const queue = new Queue<number>()
queue.push(123)
console.log(queue.pop().toFixed());
const queue2 = new Queue<string>()
queue2.push('1234')
console.log(queue2.pop().length)

interface myMap<T, U> {
    key: T;
    value: U;
}

const myList: myMap<number, string>[] = [{ key: 1, value: '1' }, { key: 2, value: '2' }]


