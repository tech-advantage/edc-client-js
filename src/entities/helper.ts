import { Article } from './article';
import { Loadable } from './loadable';
import { Link } from './link';
import { Linkable } from './linkable';

export class Helper implements Loadable, Linkable {
  exportId: string | null = '';
  label: string | null = '';
  description: string | null = '';
  url: string | null = '';
  content?: string;
  articles: Article[] | null = null;
  links: Link[] | null = null;
  language?: string | null;
}
