import { LANGUAGE_CODES } from '../language-codes';

export class LanguageService {

  static readonly SYS_DEFAULT = 'en';
  static readonly LANG_SEPARATOR = '[langCode]';

  private static instance: LanguageService;

  private defaultLanguage: string | null = null;
  private currentLanguage: string | null = null;
  private languages: string[] = [];

  private constructor() {}

  public static getInstance(): LanguageService {
    if (!LanguageService.instance) {
      LanguageService.instance = new LanguageService();
    }
    return LanguageService.instance;
  }

  init(defaultLanguage: string | null, currentLanguage: string | undefined, languages: string[] | null): string | null {
    this.setLanguages(languages);
    this.setDefaultLanguage(defaultLanguage);
    this.setCurrentLanguage(currentLanguage);
    return this.currentLanguage;
  }

  getDefaultLanguage(): string | null {
    return this.defaultLanguage;
  }

  setDefaultLanguage(code: string | null): void {
    this.defaultLanguage = (code && LANGUAGE_CODES.some(c => c === code)) ? code.substr(0, 2) : LanguageService.SYS_DEFAULT;
  }

  getCurrentLanguage(): string | null {
    return this.currentLanguage;
  }

  setCurrentLanguage(code: string | null | undefined): string | null {
    if (!code) {
      // If code is not defined, we'll try and use current language
      code = this.getCurrentLanguage();
    }
    this.currentLanguage = this.isLanguagePresent(code) ? code : this.defaultLanguage;
    return this.currentLanguage;
  }

  getLanguages(): string[] {
    return this.languages;
  }

  setLanguages(languages: string[] | null): void {
    this.languages = (languages || []).filter(code => LANGUAGE_CODES.some(c => c === code));
  }

  isLanguagePresent(langCode?: string | null | undefined): boolean {
    return !!langCode && this.languages && this.languages.some(code => code === langCode);
  }

  isLanguageValid(langCode: string | null): boolean {
    return !!langCode && LANGUAGE_CODES.some(code => code === langCode);
  }
}
