import { findDigitsPart2 } from './day1-part2-state';

describe('findDigitsPart2', () => {
  it('should find all digits and spelled-out numbers in a string', () => {
    expect(findDigitsPart2('one2three4five')).toEqual(['1', '2', '3', '4', '5']);
  });

  it('should handle overlapping spelled-out numbers', () => {
    expect(findDigitsPart2('oneight')).toEqual(['1', '8']);
  });

  it('should handle mixed digits and spelled-out numbers', () => {
    expect(findDigitsPart2('two1nine')).toEqual(['2', '1', '9']);
  });

  it('should handle strings with no valid digits or spelled-out numbers', () => {
    expect(findDigitsPart2('abcdef')).toEqual([]);
  });

  it('should handle strings with only spelled-out numbers', () => {
    expect(findDigitsPart2('onetwothreefourfivesixseveneightnine'))
      .toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9']);
  });

  it('should handle strings with repeated digits and spelled-out numbers', () => {
    expect(findDigitsPart2('two1nine2oneightwo')).toEqual(['2', '1', '9', '2', '1', '8', '2']);
  });
});