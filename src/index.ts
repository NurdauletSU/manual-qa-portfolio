import { add, divide, multiply, subtract } from "./utils";

function main() {
    console.log("Testing learning project");
    console.log(`2 + 3 = ${add(2, 3)}`);
    console.log(`10 - 4 = ${subtract(10, 4)}`);
    console.log(`6 * 7 = ${multiply(6, 7)}`);
    console.log(`20 / 5 = ${divide(20, 5)}`);
}

main();
