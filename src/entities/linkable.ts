import { Link } from './link';
import { Article } from './article';

export interface Linkable {
  links: Link[] | null;
  articles?: Article[] | null;
}
