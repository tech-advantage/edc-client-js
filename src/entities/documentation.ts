import { Loadable } from './loadable';
import { Indexable } from './indexable';
import { Linkable } from './linkable';
import { Link } from './link';

export class Documentation implements Loadable, Indexable, Linkable {
  id: number | null = null;
  exportId: string | null = '';
  label: string | null = '';
  topics: Documentation[] | null = null;
  url: string | null = '';
  content?: string | null = '';
  links: Link[] | null = null;
}
