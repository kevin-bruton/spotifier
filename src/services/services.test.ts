import { setTheme } from './theme';
import { setLanguage, t } from './literals';

describe('Services', () => {
  describe('setTheme', () => {
    it('sets the "theme" attribute on the document body to the given value', () => {
      const themeName = 'dark';
      setTheme(themeName);
      const themeAttributeValue = document.body.getAttribute('theme');
      expect(themeName).toEqual(themeAttributeValue);
    })
  });

  describe('Literals', () => {
    it('returns spanish literals after spanish is set as the language to be returned', () => {
      setLanguage('es');
      const literalKey = 'mediatype_track';
      const trackInSpanish = 'Canción';
      const returnedLiteral = t(literalKey);
      expect(returnedLiteral).toEqual(trackInSpanish);
    });

    it('returns an empty string if the literal key provided does not exist', () => {
      const literalKey = 'a_non_existant_key';
      const returnedLiteral = t(literalKey);
      expect(returnedLiteral).toEqual('');
    });
  });
});