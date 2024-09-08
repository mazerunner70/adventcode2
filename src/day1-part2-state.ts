export enum State {
  INITIAL,
  PROCESSING_LINE,
  FINISHED
}

export interface StateMachine {
  state: State;
  currentLine: string;
  firstDigit: string | null;
  lastDigit: string | null;
  sum: number;
}

interface ProcessResult {
  stateUpdates: StateMachine[];
  finalSum: number;
}

export interface DigitInfo {
  digit: string;
  index: number;
  word?: string;
}

export function createSolvePuzzleStateMachine(): StateMachine {
  return {
    state: State.INITIAL,
    currentLine: '',
    firstDigit: null,
    lastDigit: null,
    sum: 0
  };
}

export function processInput(machine: StateMachine, input: string): ProcessResult {
  const lines = input.trim().split('\n');
  const stateUpdates: StateMachine[] = [{ ...machine }];
  
  for (const line of lines) {
    machine = processLine(machine, line);
    stateUpdates.push({ ...machine });
  }
  
  machine.state = State.FINISHED;
  stateUpdates.push({ ...machine });

  return {
    stateUpdates,
    finalSum: machine.sum
  };
}

function processLine(machine: StateMachine, line: string): StateMachine {
  machine.state = State.PROCESSING_LINE;
  machine.currentLine = line;
  machine.firstDigit = null;
  machine.lastDigit = null;

  const digits = findDigitsPart2(line);
  if (digits.length > 0) {
    machine.firstDigit = digits[0].digit;
    machine.lastDigit = digits[digits.length - 1].digit;
    if (machine.firstDigit && machine.lastDigit) {
      const lineValue = parseInt(machine.firstDigit + machine.lastDigit);
      machine.sum += lineValue;
    }
  }

  return machine;
}

export function findDigitsPart2(line: string): DigitInfo[] {
  const numberWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const digits: DigitInfo[] = [];
  
  for (let i = 0; i < line.length; i++) {
    if (/\d/.test(line[i])) {
      digits.push({ digit: line[i], index: i });
    } else {
      for (let j = 0; j < numberWords.length; j++) {
        if (line.slice(i).startsWith(numberWords[j])) {
          digits.push({ digit: (j + 1).toString(), index: i, word: numberWords[j] });
          break;
        }
      }
    }
  }
  
  return digits;
}

export function getResult(machine: StateMachine): number {
  return machine.sum;
}