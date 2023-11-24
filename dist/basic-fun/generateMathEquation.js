"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMathEquation = void 0;
function generateMathEquation(maxNum, nOperation, diff, answer, correct) {
    const operations = diff === "basic" ? ["+", "-"] : ["+", "-", "*", "/"];
    let equation = "";
    let correctAnswer = 0;
    // Helper function to generate a random operation
    const getRandomOperation = () => operations[Math.floor(Math.random() * operations.length)];
    // Helper function to generate a random number
    const getRandomNumber = () => Math.floor(Math.random() * maxNum) + 1;
    // Generate the equation
    if (nOperation === 1) {
        const num1 = getRandomNumber();
        const num2 = getRandomNumber();
        const operation = getRandomOperation();
        equation = `${num1} ${operation} ${num2}`;
        correctAnswer = eval(equation);
    }
    else {
        const num1 = getRandomNumber();
        const num2 = getRandomNumber();
        const num3 = getRandomNumber();
        const operation1 = getRandomOperation();
        const operation2 = ["+", "-"].includes(operation1)
            ? getRandomOperation()
            : "+";
        equation = `${num1} ${operation1} ${num2} ${operation2} ${num3}`;
        correctAnswer = eval(equation);
    }
    // Adjust for incorrect answer
    if (!correct) {
        correctAnswer += Math.random() < 0.5 ? 1 : -1; // Randomly add or subtract 1
    }
    return {
        equation,
        displayedAnswer: answer ? correctAnswer.toString() : null,
        correctAnswer,
    };
}
exports.generateMathEquation = generateMathEquation;
