class Animal{
    static isAnimal(a){
        return a instanceof Animal
    }
    public name:String;
    constructor(name:string){
        this.name = name
    }
    run() {
        return this.name + ' is running'
    }
}

const snake = new Animal('lily')
console.log(Animal.isAnimal(snake));

console.log(snake.name);
console.log(snake.run())

class Dog extends Animal{
    bark(){
        return this.name+' is barking'
    }
}
const wangcai = new Dog('wangcai')
console.log(wangcai.run())
console.log(wangcai.bark())

class Cat extends Animal{
    constructor(name:string){
        super(name)
        console.log(this.name)
    }
    run(){
        return `Meow, `+super.run()
    }
}
const maomao = new Cat('maomao')
console.log(maomao.run());
