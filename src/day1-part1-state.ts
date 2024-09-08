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

  const digits = line.match(/\d/g) || [];
  if (digits.length > 0) {
    machine.firstDigit = digits[0] || null;
    machine.lastDigit = digits[digits.length - 1] || null;
    if (machine.firstDigit && machine.lastDigit) {
      const lineValue = parseInt(machine.firstDigit + machine.lastDigit);
      machine.sum += lineValue;
    }
  }

  return machine;
}

export function getResult(machine: StateMachine): number {
  return machine.sum;
}

export function findDigitsPart1(line: string): string[] {
  return line.match(/\d/g) || [];
}