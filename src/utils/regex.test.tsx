import { USERNAME_REGEX } from './regex';

function testRegex(
  pattern: RegExp,
  values: Array<string>,
  expectedValue: boolean
) {
  values.forEach((value) => {
    expect(pattern.test(value)).toBe(expectedValue);
  });
}

test('USERNAME_REGEX', () => {
  const validUsernames = ['testCollector', 'numbersAreOk123'];
  const invalidUsernames = [
    '',
    'space in name',
    'BadCharacter$',
    'wayTooooooooooLoonnnnggg',
  ];

  testRegex(USERNAME_REGEX, validUsernames, true);
  testRegex(USERNAME_REGEX, invalidUsernames, false);
});
