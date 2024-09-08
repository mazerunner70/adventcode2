import React, { useState } from 'react';
import * as Part1 from './day1-part1-state';
import * as Part2 from './day1-part2-state';

type Part = 'part1' | 'part2';

interface OutputState {
  step: number;
  state: Part1.State | Part2.State;
  line: string;
  firstDigit: string;
  lastDigit: string;
  lineValue: number;
  total: number;
  digitInfo?: Part2.DigitInfo[];
}

const createOutputState = (machine: Part1.StateMachine | Part2.StateMachine, step: number, part: Part): OutputState => ({
  step,
  state: machine.state,
  line: machine.currentLine,
  firstDigit: machine.firstDigit || '-',
  lastDigit: machine.lastDigit || '-',
  lineValue: machine.firstDigit && machine.lastDigit 
    ? parseInt(machine.firstDigit + machine.lastDigit) 
    : 0,
  total: machine.sum,
  digitInfo: part === 'part2' ? Part2.findDigitsPart2(machine.currentLine) : undefined
});

const Day1Puzzle: React.FC = () => {
  const [puzzleInput, setPuzzleInput] = useState('');
  const [outputStates, setOutputStates] = useState<OutputState[]>([]);
  const [puzzleResult, setPuzzleResult] = useState<number | null>(null);
  const [activePart, setActivePart] = useState<Part>('part1');

  const handleSolvePuzzle = () => {
    let machine = activePart === 'part1' 
      ? Part1.createSolvePuzzleStateMachine()
      : Part2.createSolvePuzzleStateMachine();
    const { stateUpdates, finalSum } = activePart === 'part1'
      ? Part1.processInput(machine, puzzleInput)
      : Part2.processInput(machine, puzzleInput);
    const outputs = stateUpdates.map((state, index) => createOutputState(state, index, activePart));
    setOutputStates(outputs);
    setPuzzleResult(finalSum);
  };

  const highlightDigits = (line: string, firstDigit: string, lastDigit: string, digitInfo?: Part2.DigitInfo[]) => {
    if (firstDigit === '-' || lastDigit === '-') return line;
    
    let firstIndex: number, lastIndex: number, firstHighlight: string, lastHighlight: string;

    if (activePart === 'part1') {
      firstIndex = line.indexOf(firstDigit);
      lastIndex = line.lastIndexOf(lastDigit);
      firstHighlight = firstDigit;
      lastHighlight = lastDigit;
    } else if (digitInfo) {
      const first = digitInfo[0];
      const last = digitInfo[digitInfo.length - 1];
      firstIndex = first.index;
      lastIndex = last.index;
      firstHighlight = first.word || first.digit;
      lastHighlight = last.word || last.digit;
    } else {
      return line;
    }

    return (
      <>
        {line.substring(0, firstIndex)}
        <span style={{ backgroundColor: '#00cc00', color: '#000000' }}>{firstHighlight}</span>
        {line.substring(firstIndex + firstHighlight.length, lastIndex)}
        <span style={{ backgroundColor: '#00cc00', color: '#000000' }}>{lastHighlight}</span>
        {line.substring(lastIndex + lastHighlight.length)}
      </>
    );
  };

  return (
    <div>
      <h2>Day 1: Trebuchet?!</h2>
      <div>
        <button 
          onClick={() => setActivePart('part1')} 
          style={{ backgroundColor: activePart === 'part1' ? '#00cc00' : '#1a1a2e' }}
        >
          Part 1
        </button>
        <button 
          onClick={() => setActivePart('part2')} 
          style={{ backgroundColor: activePart === 'part2' ? '#00cc00' : '#1a1a2e' }}
        >
          Part 2
        </button>
      </div>
      <textarea 
        rows={10} 
        cols={50} 
        value={puzzleInput}
        onChange={(e) => setPuzzleInput(e.target.value)}
        placeholder="Enter your puzzle input here"
      />
      <br />
      <button onClick={handleSolvePuzzle}>Solve Puzzle</button>
      {outputStates.length > 0 && (
        <div>
          <h3>State Updates:</h3>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Step</th>
                <th style={tableHeaderStyle}>State</th>
                <th style={tableHeaderStyle}>Line</th>
                <th style={tableHeaderStyle}>First Digit</th>
                <th style={tableHeaderStyle}>Last Digit</th>
                <th style={tableHeaderStyle}>Line Value</th>
                <th style={tableHeaderStyle}>Total</th>
              </tr>
            </thead>
            <tbody>
              {outputStates.map((output, index) => (
                <tr key={index}>
                  <td style={tableCellStyle}>{output.step}</td>
                  <td style={tableCellStyle}>{Part1.State[output.state]}</td>
                  <td style={tableCellStyle}>
                    {highlightDigits(output.line, output.firstDigit, output.lastDigit, output.digitInfo)}
                  </td>
                  <td style={tableCellStyle}>{output.firstDigit}</td>
                  <td style={tableCellStyle}>{output.lastDigit}</td>
                  <td style={tableCellStyle}>{output.lineValue}</td>
                  <td style={tableCellStyle}>{output.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {puzzleResult !== null && (
        <p>The sum of all calibration values is: {puzzleResult}</p>
      )}
    </div>
  );
};

const tableHeaderStyle: React.CSSProperties = {
  backgroundColor: '#1a1a2e',
  color: '#00cc00',
  padding: '10px',
  textAlign: 'left',
  borderBottom: '1px solid #333340'
};

const tableCellStyle: React.CSSProperties = {
  padding: '8px',
  borderBottom: '1px solid #333340'
};

export default Day1Puzzle;