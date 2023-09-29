import english from './english';
import french from './french';
import englishErrors from './englishErrors';
import frenchErrors from './frenchErrors';

export function getLangValue(value: string, language: string): string {
  switch (language) {
    case 'fr':
      if (!french[value] || (french[value] && french[value] === '')) {
        return english[value];
      }
      return french[value];
    default:
      return english[value];
  }
}

export function getErrorValue(value: string, language?: string): string {
  switch (language) {
    case 'fr':
      if (
        !frenchErrors[value] ||
        (frenchErrors[value] && frenchErrors[value] === '')
      ) {
        return englishErrors[value];
      }
      return frenchErrors[value];

    default:
      return englishErrors[value];
  }
}
