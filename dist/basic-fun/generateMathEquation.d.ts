type MathEquation = {
    equation: string;
    displayedAnswer: string | null;
    correctAnswer: number;
};
export declare function generateMathEquation(maxNum: number, nOperation: number, diff: "basic" | "difficult", answer: boolean, correct: boolean): MathEquation;
export {};
