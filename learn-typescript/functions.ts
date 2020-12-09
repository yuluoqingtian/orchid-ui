// 函数声明
function add(x: number, y: number, z?: number, p: number = 10): number {
    if (typeof z === 'number') {
        return x + y + z
    } else {
        return x + y
    }
}

let result = add(2, 3, 2)

// 函数表达式
const add2 = (x: number, y: number, z?: number, p: number = 10): number => {
    if (typeof z === 'number') {
        return x + y + z
    } else {
        return x + y
    }
}
// 这句会报错因为类型不匹配
// let str: string = add2
// 这句不会报错，因为类型是匹配的
let fun: (x: number, y: number, z?: number, p?: number) => number = add2