import { Loadable } from './loadable';

export class Article implements Loadable {
  exportId: string | null = null;
  label: string | null = '';
  url: string | null = '';
  content?: string | null = '';
}
