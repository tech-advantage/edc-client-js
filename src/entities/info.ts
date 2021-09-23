export class Info {
  vendor = '';
  version = '';
  name = '';
  titles: { [key: string]: {title: string} } | null = null;
  identifier = '';
  defaultLanguage = ''; // Language used by default
  languages: string[] | null = null; // Languages presents in this export
}
