describe('Data types', () => {
  it('list data type', () => {
    let name: string        = 'John';
    let age: number         = 20;
    let isMarried: boolean  = false;

    console.log(name, age, isMarried);
  });

  it('array', () => {
    let names: string[] = ['John', 'Jane'];
    names.push('Doe');

    console.log(names);
  });

  it('readonly array', () => {
    let names: ReadonlyArray<string> = ['John', 'Jane'];
    // names.push('Doe'); // error

    console.log(names);
  });

  it('tuple (readonly)', () => {
    let dummyData: readonly [string, number, boolean] = ['John', 20, true];
    // names.push('Doe'); // error

    console.log(dummyData);
  });

  it('any', () => {
    const person: any = {
      id: 1,
      name: 'John',
      age: 20,
    }

    console.log(person.id);
  });

  it('union type', () => {
    let dummyData: string | number | boolean = 'John';
    dummyData = 20;
    dummyData = true;

    console.log(dummyData);
  });

  it('union type 2', () => {
    function dummyFunc(param: string | number | boolean): any {
      switch (typeof param) {
        case 'string':
          return param.toUpperCase();

        case 'number':
          return param + 3;

        case 'boolean':
          return !param;

        default:
          return null;
      }
    }

    expect(dummyFunc('john')).toBe('JOHN');
    expect(dummyFunc(20)).toBe(23);
    expect(dummyFunc(false)).toBe(true);
  });

  it('alias', () => {
    type ID = string | number;
    
    type Tag = {
      id:   ID;
      name: string;
    }

    type Product = {
      id:     ID;
      name:   string;
      price:  number;
      tags:   Tag[];
    }

    const tag: Tag = {
      id:   1,
      name: 'food',
    }

    const product: Product = {
      id:     '1',
      name:   'Milk',
      price:  20_000,
      tags:   [tag],
    }

    expect(tag.id).toBe(1);
  });

  it('object type', () => {
    const tag: { id: string | number; name: string } = {
      id:   1,
      name: 'food',
    }

    const product: {
      id: string | number;
      name: string;
      price: number;
      tags: {
        id: string | number;
        name: string
      }[]
    } = {
      id:     '1',
      name:   'Milk',
      price:  20_000,
      tags:   [tag],
    }

    expect(tag.id).toBe(1);
  });

  it('optional props', () => {
    type Tag = {
      id:     number;
      name:   string;
      desc?:  string;
    }

    const tag: Tag = {
      id:   1,
      name: 'food',
    }

    expect(tag.id).toBe(1);
  });

  it('enum', () => {
    enum DifficultyLevel {
      EASY,         // 0
      MEDIUM,       // 1
      HARD,         // 2
      PROFESSIONAL, // 3
    }
    enum OtherDifficultyLevel {
      EASY          = 0,
      MEDIUM        = 1,
      HARD          = 2,
      PROFESSIONAL  = 3,
    }
    enum Other2DifficultyLevel {
      EASY          = 'EASY PEASY',
      MEDIUM        = 'MED',
      HARD          = 'HARD',
      PROFESSIONAL  = 'UNBELIEVABLE',
    }

    type Game = {
      id: string;
      mode: DifficultyLevel;
      otherMode: OtherDifficultyLevel,
      other2Mode: Other2DifficultyLevel,
    }

    const game: Game = {
      id: '1',
      mode: DifficultyLevel.HARD,
      otherMode: OtherDifficultyLevel.EASY,
      other2Mode: Other2DifficultyLevel.PROFESSIONAL,
    }

    expect(game.mode).toBe(2);
    expect(game.otherMode).toBe(0);
    expect(game.other2Mode).toBe('UNBELIEVABLE');
  });

  it('interface', () => {
    type ID = string | number;
    
    interface Tag {
      id:   ID;
      name: string;
    }
    interface Tag {
      description?: string;
    }

    interface Product {
      id:     ID;
      name:   string;
      price:  number;
      tags:   Tag[];
    }

    // type Combination = Tag & Product; // -> interface intersection
    interface Combination extends Tag, Product {}; // -> interface extends

    const tag: Tag = {
      id:   1,
      name: 'food',
      description: 'to be eat',
    }

    const product: Product = {
      id:     '1',
      name:   'Milk',
      price:  20_000,
      tags:   [tag],
    }

    const combination: Combination = {
      ...tag,
      ...product,
    }

    expect(tag.id).toBe(1);
    expect(combination.id).toBe(product.id);
    expect(combination.name).toBe(product.name);
    expect(combination.description).toBe(tag.description);
    expect(combination.price).toBe(product.price);
    expect(combination.tags[0]).toBe(tag);
  });

  it('readonly', () => {
    type Tag = {
      id:             string | number;
      readonly name:  string;
      description?:   string;
    }

    const tag: Tag = {
      id:   1,
      name: 'food',
      description: 'to be eat',
    }

    // tag.name = 'drink'; // error but test will be passed
    // expect(tag.name).toBe('drink');
  });

  it('function interface', () => {
    interface AddFunc {
      (num1: number, num2: number): number;
    }

    const add: AddFunc = (num, num2) => {
      return num + num2;
    }

    expect(add(1,2)).toBe(3);
  });

  it('indexable interface', () => {
    interface NumberIndexArray {
      [index: number]: string;
    }
    interface StringIndexArray {
      [key: string]: string;
    }

    const sample: NumberIndexArray = ['John', 'Doe'];
    const sample2: StringIndexArray = {
      firstName: 'John',
      lastName: 'Doe',
    };

    expect(sample[0]).toBe('John');
    expect(sample2.firstName).toBe('John');
  });

  it('interface function', () => {
    interface Person {
      name: string;
      sayHello(name: string): string;
    }

    const andi: Person = {
      name: 'andi',
      sayHello: function(name) {
        return `Hello ${name}`;
      }
    }

    expect(andi.name).toBe('andi');
    expect(andi.sayHello('john')).toBe('Hello john');
  });

  it('rest parameter func', () => {
    function sum(...args: number[]): number {
      let total = 0;

      for (let i = 0; i < args.length; i++) {
        total += args[i];
      }

      return total;
    }

    expect(sum(1,2,3,4,5)).toBe(15);
  });

  it('function overloading', () => {
    function dummyFunc(param: string): string;
    function dummyFunc(param: number): number;
    function dummyFunc(param: boolean): boolean;

    function dummyFunc(param: any): any {
      switch (typeof param) {
        case 'string':
          return param.toUpperCase();

        case 'number':
          return param + 3;

        case 'boolean':
          return !param;

        default:
          return null;
      }
    }

    expect(dummyFunc('john')).toBe('JOHN');
    expect(dummyFunc(20)).toBe(23);
    expect(dummyFunc(false)).toBe(true);
  });

  it('function as func arg', () => {
    function dummyFunc(name: string, func: (str: string) => string): string {
      return func(`Hello ${name}`);
    }

    expect(dummyFunc('john', (el) => el.toUpperCase())).toBe('HELLO JOHN');
  });

  it('generics func arg', () => {
    function dummyFunc<Type>(arg: Type): string {
      return `hello ${arg}`;
    }

    const sample = dummyFunc<{name: string, age: number}>({
      name: 'john',
      age: 20,
    })
    console.log(sample);
  });

  it('generics func arg 2', () => {
    function dummyFunc<T, U>(arg: T, arg2: U): string {
      return `hello ${arg} ${arg2}`;
    }

    const sample = dummyFunc<{name: string, age: number}, string>(
      {
        name: 'john',
        age: 20,
      },
      'dummy'
    )

    console.log(sample);
  });

  it('generics func arg 3', () => {
    type Container<A, B> = {
      first: A;
      second: B;
    }

    function dummyFunc<T, U>(arg: T, arg2: U): Container<T, U> {
      // return `hello ${arg} ${arg2}`;
      return {
        first: arg,
        second: arg2,
      }
    }

    const sample = dummyFunc<{name: string, age: number}, string>(
      {
        name: 'john',
        age: 20,
      },
      'dummy'
    )

    console.log(sample);
    expect(sample.first.name).toBe('john');
    expect(sample.second).toBe('dummy');
  });
});
