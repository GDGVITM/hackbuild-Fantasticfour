// dummydata.ts - Assessment dummy data
export interface Question {
  question: string
  options: string[]
  answers: number[]
}

export interface AssessmentData {
  questions: Question[]
}

// Dummy assessment data
export const dummyAssessmentData: AssessmentData = {
  questions: [
    {
      question: "**Select all even numbers:**\n\nFrom the following list, identify which numbers are divisible by 2:",
      options: ["2", "3", "4", "5", "6", "7", "8"],
      answers: [0, 2, 4, 6]
    },
    {
      question: "## Simple Arithmetic\n\nWhat is `2 + 2`?",
      options: ["3", "4", "5", "6"],
      answers: [1]
    },
    {
      question: "### Programming Languages\n\nWhich of the following are **programming languages**?\n\n> Consider languages that can be used to write executable code.",
      options: ["JavaScript", "HTML", "Python", "CSS", "Java", "SQL"],
      answers: [0, 2, 4]
    },
    {
      question: "## Geography Question\n\nWhat is the **capital** of France?\n\n*Think about the largest city and political center.*",
      options: ["London", "Berlin", "Paris", "Madrid"],
      answers: [2]
    },
    {
      question: "### Mathematics - Quadratic Formula\n\nThe quadratic formula is: `ax² + bx + c = 0`\n\nWhich of the following represents the **solutions** to this equation?\n\n> The discriminant is `b² - 4ac`",
      options: [
        "`x = (-b ± √(b² - 4ac)) / 2a`",
        "`x = (-b ± √(b² + 4ac)) / 2a`",
        "`x = (b ± √(b² - 4ac)) / 2a`",
        "`x = (-b ± √(4ac - b²)) / 2a`"
      ],
      answers: [0]
    },
    {
      question: "## Physics - Newton's Laws\n\nAccording to **Newton's Second Law**, which equation correctly represents the relationship between force, mass, and acceleration?\n\n### Given:\n- F = Force (in Newtons)\n- m = Mass (in kg)\n- a = Acceleration (in m/s²)",
      options: [
        "`F = m + a`",
        "**`F = m × a`** *(Correct - Force equals mass times acceleration)*",
        "`F = m / a`",
        "`F = a / m`"
      ],
      answers: [1]
    },
    {
      question: "### Programming - Data Types\n\nWhich of the following are **primitive data types** in JavaScript?\n\n> Primitive types are the basic building blocks of data.",
      options: [
        "`string` - *Text data*",
        "`object` - *Complex data structure*",
        "`number` - *Numeric values*",
        "`array` - *List of items*",
        "`boolean` - *True/false values*",
        "`undefined` - *Absence of value*"
      ],
      answers: [0, 2, 4, 5]
    },
    {
      question: "## Web Development\n\nWhich of the following are **frontend technologies**?\n\n*Select all that apply for client-side development.*",
      options: ["React", "Node.js", "CSS", "MongoDB", "HTML", "Express.js"],
      answers: [0, 2, 4]
    },
    {
      question: "### Basic Logic\n\nIn boolean logic, what is the result of `true AND false`?",
      options: ["true", "false", "null", "undefined"],
      answers: [1]
    },
    {
      question: "## Computer Science Fundamentals\n\nWhich data structure follows the **Last In, First Out (LIFO)** principle?\n\n> Think about how items are added and removed.",
      options: ["Queue", "Stack", "Array", "Linked List"],
      answers: [1]
    }
  ]
};

// Default assessment state
export const dummyAssessmentState = {
  currentQuestionIndex: 0,
  userAnswers: [] as number[][],
  timeRemaining: 15 * 60, // 15 minutes in seconds
  isTestStarted: false,
  isTestCompleted: false,
  score: 0,
  showResults: false,
  lastSaveTime: null as number | null
};
