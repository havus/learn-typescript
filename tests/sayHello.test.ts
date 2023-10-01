import { sayHello } from "../src/sayHello";

describe('Hello', () => {
  it('should return string hello', () => {
    const name = 'John';
    expect(sayHello(name)).toBe(`Hello ${name}`);
  });
});
