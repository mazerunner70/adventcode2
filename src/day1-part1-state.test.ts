import { findDigitsPart1 } from './day1-part1-state';

describe('findDigitsPart1', () => {
  it('should find all digits in a string', () => {
    expect(findDigitsPart1('a1b2c3d4e5f')).toEqual(['1', '2', '3', '4', '5']);
  });

  it('should return an empty array if no digits are found', () => {
    expect(findDigitsPart1('abcdef')).toEqual([]);
  });

  it('should handle strings with only digits', () => {
    expect(findDigitsPart1('12345')).toEqual(['1', '2', '3', '4', '5']);
  });

  it('should handle strings with digits at the beginning and end', () => {
    expect(findDigitsPart1('1abc2')).toEqual(['1', '2']);
  });

  it('should handle strings with repeated digits', () => {
    expect(findDigitsPart1('aa1bb2cc3dd11')).toEqual(['1', '2', '3', '1', '1']);
  });
});