type PlusType = (x: number, y: number) => number

function add(x: number, y: number): number {
    return x + y
}

const add2: PlusType = add

type NameResolver = () => string
type NameOrResolver = string | NameResolver

function getName(n: NameOrResolver): string {
    if (typeof (n) === 'string') {
        return n
    } else {
        return n()
    }
}

function getLength(input: string | number): number {
    // const str = input as String 
    // if(str.length){
    //     return str.length
    // }else{
    //     const number = input as Number
    //     return number.toString().length
    // }

    if ((<string>input).length) {
        return (<string>input).length
    } else {
        return (<number>input).toString().length
    }
}