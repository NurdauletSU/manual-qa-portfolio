import { add, divide, multiply, subtract } from "../src/utils";

describe("math utility functions", () => {
    test("adds two numbers", () => {
        expect(add(2, 3)).toBe(5);
        expect(add(-2, 2)).toBe(0);
    });

    test("subtracts two numbers", () => {
        expect(subtract(10, 4)).toBe(6);
        expect(subtract(3, 8)).toBe(-5);
    });

    test("multiplies two numbers", () => {
        expect(multiply(6, 7)).toBe(42);
        expect(multiply(-3, 5)).toBe(-15);
    });

    test("divides two numbers", () => {
        expect(divide(20, 5)).toBe(4);
        expect(divide(7, 2)).toBe(3.5);
    });

    test("throws an error when dividing by zero", () => {
        expect(() => divide(10, 0)).toThrow("Cannot divide by zero.");
    });
});
